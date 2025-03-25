const Banner = require('../Schema/BannerSchema');

// @desc    Add a new banner
// @route   POST /api/banners
exports.addBanner = async (req, res) => {
    try {
        const { name, images, description } = req.body;

        if (!name || !images || images.length === 0) {
            return res.status(400).json({ message: "Name and at least one image are required." });
        }

        const banner = new Banner({ name, images, description });
        await banner.save();
        res.status(201).json({ message: "Banner added successfully", banner });
    } catch (error) {
        res.status(500).json({ message: "Error adding banner", error });
    }
};

// @desc    Get all banners
// @route   GET /api/banners
exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching banners", error });
    }
};

// @desc    Get a single banner by ID
// @route   GET /api/banners/:id
exports.getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: "Error fetching banner", error });
    }
};

// @desc    Update a banner by ID
// @route   PUT /api/banners/:id
exports.updateBanner = async (req, res) => {
    try {
        const { name, images, description } = req.body;
        const banner = await Banner.findByIdAndUpdate(
            req.params.id,
            { name, images, description },
            { new: true, runValidators: true }
        );

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (error) {
        res.status(500).json({ message: "Error updating banner", error });
    }
};

// @desc    Delete a banner by ID
// @route   DELETE /api/banners/:id
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting banner", error });
    }
};
