const donorsModel = require("../model/donors");

exports.donorRegister = async (req, res) => {
    console.log("inside donorRegister");
    const userId = req.userId
    const { name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases } = req.body
    try {
        const existingDonor = await donorsModel.findOne({ email })
        if (existingDonor) {
            res.status(406).json("Alredy donate with this email.. please use another email!!!")
        } else {
            const newDonor = new donorsModel({
                name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases, userId
            })
            await newDonor.save()
            res.status(200).json(newDonor)
        }
    } catch (err) {
        res.status(401).json(err)

    }
}

exports.allUserDonor = async (req, res) => {
    console.log("inside allUserDonor");
    const { state, city, blood } = req.query
    console.log(state);
    console.log(blood);
    try {
        let query = {};
        if (state) query.state = { $regex: state, $options: 'i' };
        if (blood) query.bloodgroup = { $regex: blood, $options: 'i' };
        if (city) query.city = { $regex: city, $options: 'i' };
        let allDonors = await donorsModel.find(query)
        const negativeGroups = ["A-", "B-", "O-", "AB-"];
        if (blood && !negativeGroups.includes(blood)) {
            allDonors = allDonors.filter(i => i.bloodgroup === blood);
        }
        console.log(allDonors);

        res.status(200).json(allDonors)

    } catch (error) {
        res.status(401).json(error)
        console.log(error);


    }
}

exports.donorProfile = async (req, res) => {
    const userId = req.userId
    try {
        const existingProfile = await donorsModel.findOne({ userId })
        if (existingProfile) {
            res.status(200).json(existingProfile)

        } else {
            res.status(401).json("not donor register")

        }
    } catch (error) {
        res.status(401).json(error)

    }


}
exports.updateDonorProfile = async (req, res) => {
    const userId = req.userId

    const { name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases } = req.body

    try {
        const editDonorsProfile = await donorsModel.updateOne({ userId },{name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases},{new:true})
        res.status(200).json(editDonorsProfile)

    } catch (error) {
        res.status(401).json(error)
        console.log(error);

    }
}



exports.donorRegisterStatus = async (req, res) => {
    const { id } = req.params
    const status = req.query.status
    try {
        const existingStatus = await donorsModel.findById({ _id: id })
        existingStatus.status = status
        await existingStatus.save()
        res.status(200).json(existingStatus)
    } catch (error) {
        res.status(402).json(error.message)
        console.log(error);
    }
}


exports.approveDonor = async (req, res) => {
    const { state, city, blood } = req.query
    console.log(state);
    console.log(blood);
    try {
        let query = { status: "Approved" };

        if (state) query.state = { $regex: state, $options: "i" };
        if (city) query.city = { $regex: city, $options: "i" };
        if (blood) query.bloodgroup = { $regex: blood, $options: 'i' };

        let donors = await donorsModel.find(query)
        const negativeGroups = ["A-", "B-", "O-", "AB-"];
        if (blood && !negativeGroups.includes(blood)) {
            donors = donors.filter(i => i.bloodgroup === blood);
        }
        res.status(200).json(donors)

    } catch (error) {
        res.status(401).json(error)

    }


}
exports.deleteDonor = async (req, res) => {
    const { id } = req.params
    console.log("d");

    try {
        const donors = await donorsModel.findByIdAndDelete({ _id: id })
        res.status(200).json("Delete Successfully")

    } catch (error) {
        res.status(401).json(error)
        console.log(error);


    }
}
exports.getAdminDonor = async (req, res) => {
    const { id } = req.params
    try {
        const editDonors = await donorsModel.findOne({ _id: id })
        res.status(200).json(editDonors)

    } catch (error) {
        res.status(401).json(error)

    }
}

exports.updateAdminDonor = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const { name, email, phone, age, weight, gender, bloodgroup, state, city, address, diseases } = req.body

    try {
        const editDonors = await donorsModel.findByIdAndUpdate({ _id: id }, { name, email, phone, age, weight, gender, bloodgroup, state, city, address, userId, diseases }, { new: true })
        await editDonors.save()
        res.status(200).json(editDonors)

    } catch (error) {
        res.status(401).json(error)
        console.log(error);

    }
}

