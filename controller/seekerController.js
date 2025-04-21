const seekerModel = require("../model/seeker")



exports.seekerRegister = async (req, res) => {
    console.log("inside seekerRegister");
    const userId = req.userId
    const { name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases } = req.body
    try {
        const existingSeeker = await seekerModel.findOne({ email })
        if (existingSeeker) {
            res.status(406).json("Alredy Apply with this email.. please use another email!!!")
        } else {
            const newSeeker = new seekerModel({
                name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases, userId
            })
            await newSeeker.save()
            res.status(200).json(newSeeker)
        }
    } catch (err) {
        res.status(401).json(err)

    }
}
exports.getAllSeeker = async (req, res) => {
    const { state, city, blood } = req.query
    console.log(state);
    console.log(blood);

    try {
        let query = {};
        if (state) query.state = { $regex: state, $options: 'i' };
        if (blood) query.bloodgroup = { $regex: blood, $options: 'i' };
        if (city) query.city = { $regex: city, $options: 'i' };
        let allUser = await seekerModel.find(query)
        const negativeGroups = ["A-", "B-", "O-", "AB-"];
        if (blood && !negativeGroups.includes(blood)) {
            allUser = allUser.filter(i => i.bloodgroup === blood);
        }
        res.status(200).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.seekerDelete = async (req, res) => {
    const { id } = req.params
    try {
        await seekerModel.findByIdAndDelete({ _id: id })
        res.status(200).json("Delete Successfully")
    } catch (error) {
        res.status(401).json(err)

    }

}