import getModels from '../../../models/modelHelper.js';

export function fetchProfile(req, res) {
  const profile = req.user;
  res.json(profile);
}

export async function fetchCard(req, res) {
  const { dbToken } = req;
  const { admin } = await getModels(dbToken);
  // const { related } = req.user;
  const { LOCATION_ORIGIN } = process.env;

  // const img = await admin.find({ name: { $in: related } });
  const img = await admin.find();
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

  const resData = await Promise.all(
    checkoutData.map(async (checkoutDoc) => {
      const resDataItems = await Promise.all(
        checkoutDoc.order_Items.map(async (item) => {
          const menuItem = await menu
            .findOne({ _id: item.item_ID })
            .select('name main_image');

          return {
            ...item,
            name: menuItem.name,
            main_image: `${CDN_LOCATION_ORIGIN}/${menuItem.main_image}`,
          };
        }),
      );

      return {
        ...checkoutDoc._doc,
        order_Items: resDataItems,
      };
    }),
  );

  res.json(resData);
}
export async function fetchStoreInfo(req, res) {
  const { dbToken } = req;
  const { setup } = await getModels(dbToken);
  const setupData = await setup.findOne().sort({ update_time: -1 });
  res.json(setupData);
}
