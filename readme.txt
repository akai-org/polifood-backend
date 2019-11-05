Standard Response:
{
    "status": "success" || "error",
    "message": String || null,
    "data": Object
}

GET /categories

input:

    null

output:

    "message": null || err
    "data": [
        {
            "id": String,
            "name": String
        }
    ]

POST /categories

input:

    {
        "name": String
    }

output:

    "message": 'Already Exist' || 'Created' || err
    "data": {
        "id": String,
        "name": String
    }

DELETE /categories

input:

    {
        "id": String
    }

output:

    "message": 'Not Found' || 'Deleted' || err
    "data": null

PUT /categories

input:

    {
        "id": String, // to change
        "name": String // new name
    }

output:

    "message": 'Updated' || err
    "data": {
        "id": String, // updated id
        "name": String // updated name
    }

GET /markers

input:

    {
        "location": [Number, Number] // current location
        "distance": Number // in meters
        "filters": [String] // ids
    }

output:
    [
        {
            "id": String,
            "name": String
        }
    ]

POST /markers

input:

{
	"name": "Stołówka studencka",
	"images": [], // strings
	"address": {
		"street": "Baraniaka",
		"number": "6"
	},
	"location": [52.4028345,16.9557584],
	"categories": ["5dbae6e33b860a3bcc25b7af"], // category ids
	"details": {
		"description": "Lorem Ipsum",
		"menu": [], // menu item ids
		"hours": {
			"monday": {
	            "from": "10:00",
	            "to": "20:00"
	        },
	        "tuesday": {
	            "from": "10:00",
	            "to": "20:00"
	        },
	        "wednesday": {
	            "from": "10:00",
	            "to": "20:00"
	        },
	        "thursday": {
	            "from": "10:00",
	            "to": "20:00"
	        },
	        "friday": {
	            "from": "10:00",
	            "to": "20:00"
	        },
	        "saturday": {
	            "from": "10:00",
	            "to": "24:00"
	        },
	        "sunday": {
	            "from": "12:00",
	            "to": "24:00"
	        }
		},
		"comments": []
	}

}

output:

{
    "status": "success",
    "message": "Created",
    "data": {
        "id": "5dc02833402dec1b08e5f64a",
        "images": [],
        "address": {
            "street": "Baraniaka",
            "number": 6
        },
        "location": [
            52.4028345,
            16.9557584
        ],
        "categories": [
            "5dbae6e33b860a3bcc25b7af"
        ],
        "details": {
            "description": "Lorem Ipsum",
            "menu": [],
            "hours": {
                "monday": {
                    "from": "10:00",
                    "to": "20:00"
                },
                "tuesday": {
                    "from": "10:00",
                    "to": "20:00"
                },
                "wednesday": {
                    "from": "10:00",
                    "to": "20:00"
                },
                "thursday": {
                    "from": "10:00",
                    "to": "20:00"
                },
                "friday": {
                    "from": "10:00",
                    "to": "20:00"
                },
                "saturday": {
                    "from": "10:00",
                    "to": "24:00"
                },
                "sunday": {
                    "from": "12:00",
                    "to": "24:00"
                }
            },
            "comments": []
        }
    }
}