const connection = require('../config/database');

exports.listSchool = async (req, res) => {
    try {
        const { latitude, longitude, page = 1, limit = 10 } = req.query;

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        
        // Validate required parameters
        if (!lat || !lon) {
            res.status(412).json({
                success: false,
                message: "Data is incomplete",
            });
            return;
        }

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const offset = (parsedPage - 1) * parsedLimit;

        // Validate pagination inputs
        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
            res.status(400).json({
                success: false,
                message: "Invalid pagination parameters",
            });
            return;
        }

        // Query 
        const query = `
            SELECT *, 
                   POWER(latitude - ${lat}, 2) + POWER(longitude - ${lon}, 2) AS dis 
            FROM Description 
            ORDER BY dis 
            LIMIT ${parsedLimit} 
            OFFSET ${offset};
        `;

        connection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(501).json({
                    success: false,
                    data: "Internal server error",
                    message: err.message,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: rows,
                    message: "Data retrieved successfully",
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }
};

