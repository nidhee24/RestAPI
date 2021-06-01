const getPing = (req, res) => {
    res.status(200).send({
        success: 'true',
    })
}

module.exports = {getPing}

// Step 1 route: /api/ping which return success is true in JSON form if server is started with code 200