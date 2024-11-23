const connection = require('../config/database');
exports.listSchool = async (req, res) => {
    try {
        const { latitude, longitude } = req.params;
        if(!latitude || !longitude)
        {
            res.status(412).json({
                success: false,
                message: " data is incomplete"
            })
            return;
        }

        connection.query(`select * , POWER(latitude -${latitude},2) + POWER(longitude -${longitude},2) as dis from Description order by dis ;`, (err, rows, fileds) => {
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
                res.status(500)
                    .json({
                        success: true,
                        data : rows,
                        message:'data is sorted'
                    })
            }
        })

    }
    catch {
        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: err.message,
            })
    }
}
