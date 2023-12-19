import getModels from '../../../models/modelHelper.js';

export function fetchProfile(req, res) {
  const profile = req.user;
  res.json(profile);
}

export async function fetchCard(req, res) {
  const { dbToken } = req;
  const { admin } = await getModels(dbToken);
  const { LOCATION_ORIGIN } = process.env;

  // const img = await admin.find({ name: { $in: related } });
  const img = await admin.find();
  console.log(dbToken);
  console.log(img);
  const cards = img.map((i) => ({
    img: i.campaign,
    url: `${LOCATION_ORIGIN}/user/signIn/${i.name}`,
  }));

  res.json(cards);
}

export async function fetchCredits(req, res) {
  const sub = req.user.id;
  const { dbToken } = req;
  const { user } = await getModels(dbToken);

  try {
    const userData = await user.findOne({
      sub,
    });
    res.json(userData.credits);
  } catch (err) {
    console.error(err);
  }
}

export async function fetchHistory(req, res) {
  const { dbToken } = req;
  const { history } = req.user; // 拿到一個 array
  const { checkout, menu } = await getModels(dbToken);
  const { CDN_LOCATION_ORIGIN } = process.env;

  const checkoutData = await checkout
    .find({
      _id: { $in: history },
    })
    .select(
      'checkout_Time amount order_Items.item_ID order_Items.qty order_Items.price order_Items.amount',
    );

  console.log(checkoutData);

  const resData = await Promise.all(
    checkoutData.map(async (checkoutDoc) => {
      const resDataItems = await Promise.all(
        checkoutDoc.order_Items.map(async (item) => {
          const menuItem = await menu
            .findOne({ _id: item.item_ID })
            .select('name main_image');

          if (!menuItem) {
            return null;
          }

          return {
            ...item,
            name: menuItem.name,
            main_image: `${CDN_LOCATION_ORIGIN}/${menuItem.main_image}`,
          };
        }),
      );

      // 使用 filter 方法过滤掉 null 的项
      return {
        ...checkoutDoc._doc,
        order_Items: resDataItems.filter((item) => item !== null),
      };
    }),
  );

  console.log(resData);
  res.json(resData);
}

export async function fetchStoreInfo(req, res) {
  const { dbToken } = req;
  const { setup } = await getModels(dbToken);
  const setupData = await setup.findOne().sort({ update_time: -1 });
  res.json(setupData);
}

export async function fetchComments(req, res) {
  try {
    const { dbToken } = req;
    const { setup } = await getModels(dbToken);
    const setupData = await setup.findOne().sort({ update_time: -1 });
    const { name, location } = setupData;

    if (!name && !location) {
      throw new Error('Name and Location are both empty');
    }

    const { GOOGLE_PLACE_API_KEY } = process.env;

    const placeInput = `${location} ${name}`;
    const placeAPIUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      placeInput,
    )}&inputtype=textquery&fields=place_id&key=${GOOGLE_PLACE_API_KEY}`;

    const placeAPIResponse = await fetch(placeAPIUrl);
    const placeAPIData = await placeAPIResponse.json();

    if (placeAPIData.status !== 'OK') {
      throw new Error(`Error fetching place ID: ${placeAPIData.status}`);
    }

    const placeID = placeAPIData.candidates[0].place_id;
    const commentsAPIUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&language=zh-TW&key=${GOOGLE_PLACE_API_KEY}`;

    const commentsAPIResponse = await fetch(commentsAPIUrl);
    const commentsAPIData = await commentsAPIResponse.json();

    if (commentsAPIData.status !== 'OK') {
      throw new Error(`Error fetching comments: ${commentsAPIData.status}`);
    }

    const { reviews } = commentsAPIData.result;
    const resData = reviews.map((review) => ({
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
    }));

    res.json(resData);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
}
