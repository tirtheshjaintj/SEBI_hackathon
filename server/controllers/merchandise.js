const Merchandise = require("../models/Merchandise");
const MerchandiseTrans = require("../models/MerchandiseTrans");
const RedeemMerchandise = require("../models/RedeemMerchandise");
const User = require("../models/User");

const getAllMerchandise = async (req, res) => {
  try {
    const userId = req.user._id;
    const { language } = req.headers;

    let merchandise;

    if (language && language !== "en") {
      merchandise = await Merchandise.aggregate([
        {
          $lookup: {
            from: "merchandisetrans",
            let: { id: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$merchandiseId", "$$id"] },
                      { $eq: ["$language", language] },
                    ],
                  },
                },
              },
              {
                $project: {
                  name: 1,
                  description: 1,
                  _id: 0,
                },
              },
            ],
            as: "translations",
          },
        },
        {
          $addFields: {
            name: {
              $ifNull: [{ $arrayElemAt: ["$translations.name", 0] }, "$name"],
            },
            description: {
              $ifNull: [
                { $arrayElemAt: ["$translations.description", 0] },
                "$description",
              ],
            },
          },
        },
        {
          $project: {
            translations: 0,
          },
        },
      ]);
    } else {
      merchandise = await Merchandise.find().lean();
    }

    const redeemedMerchandise = await RedeemMerchandise.find({
      uid: userId,
    }).lean();

    const redeemedIds = new Set(
      redeemedMerchandise.map((item) => item.merchandiseId.toString())
    );

    const updatedMerchandise = merchandise.map((item) => {
      const isRedeemed = redeemedIds.has(item._id.toString());
      return {
        ...item,
        isRedeemed,
      };
    });

    res.status(200).json({
      success: true,
      merchandise: updatedMerchandise,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const redeemMerchandise = async (req, res) => {
  try {
    const { merchandiseId } = req.params;

    const merchandise = await Merchandise.findById(merchandiseId);
    const userPoints = await User.findById(req.user._id);
    if (userPoints.points < merchandise.points) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient points" });
    }
    if (!merchandise) {
      const redeemMerchandise = await RedeemMerchandise.create({
        merchandiseId,
        uid: req.user._id,
      });
      await User.findByIdAndUpdate(req.user._id, {
        points: req.user.points - merchandise.points,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Merchandise already redeemed" });
    }
    res
      .status(200)
      .json({ success: true, message: "Merchandise redeemed successfully" });
  } catch (error) {
    console.error("Error redeeming merchandise:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllMerchandise, redeemMerchandise };
