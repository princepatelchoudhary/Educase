const connection = require('../config/database');

exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        if (!name || !address || !latitude || !longitude) {
            res.status(412).json({
                success: false,
                message: " data is incomplete"
            })
            return;
        }

        connection.query(`insert into Description (name,address,latitude, 
            longitude) value('${name}','${address}',${latitude},${longitude});`, (err, rows, fileds) => {
            if (err) {
                console.log(err);
                res.status(501)
                    .json({
                        success: false,
                        data: "internal server error",
                        message: err.message,
                    })
            }
            else {
                res.status(200)
                    .json({
                        success: true,
                        message:'data is insert'
                    })
            }
        })

    }
    catch (err) {
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: "internal server error2",
                message: err.message,
            })
    }

}
