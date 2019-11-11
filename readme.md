## Polifood API Documentation

### Allowed HTTPs requests

Type | Function
:-:|:-:
GET | Get a resource
POST | Create a resource
PUT | Update a resource
DELETE | Delete a resource

### Response status codes

Code | Description
:---:|:------------:
200  | Success
201  | Created
400  | Bad Request - Invalid URL
404  | Resource Not Found
406  | Not Acceptable Input
500  | Server Error


#### GET /categories

input:

    null

output:

    {
        "status": "success" || "error",
        "message": null || err,
        "data": [
            {
                "id": String,
                "name": String
            }
        ]
    }

POST /categories

input:

    {
        "name": String
    }

output:

    {
        "status": "success" || "error",
        "message": "Already Exists" || "Created" || err,
        "data": {
            "id": String,
            "name": String
        }
    }

DELETE /categories

input:

    {
        "id": String
    }

output:

    {
        "status": "success" || "error",
        "message": 'Not Found' || 'Deleted' || err,
        "data": null
    }

PUT /categories

input:

    {
        "id": String, // to change
        "name": String // new name
    }

output:

    {
        "status": "success" || "error",
        "message": 'Updated' || err,
        "data": {
            "id": String, // updated id
            "name": String // updated name
        }
    }

GET /markers

input:

    {
        "location": [Number, Number] // current location
        "distance": Number // in meters
        "categories": String[] // ids
    }

output:

    {
        "status": "success" || "error",
        "message": null || err,
        "data": [
            {
                "id": String,
                "name": String,
                "address": {
                    "street": String,
                    "number": String
                },
                "location": [Number, Number],
                "categories": String[]
            }
        ]
    }

POST /markers

input:

    {
        "name": String,
        "address": {
            "street": String,
            "number": String
        },
        "location": [Number, Number],
        "categories": String[], // category ids
        "details": {
            "description": String,
            "images": String[], 
            "menu": String[], // menu item ids
            "hours": {
                "monday": {
                    "from": String, // ex. "8:00"
                    "to": String // ex. "20:00"
                },
                "tuesday": {
                    "from": String,
                    "to": String
                },
                "wednesday": {
                    "from": String,
                    "to": String
                },
                "thursday": {
                    "from": String,
                    "to": String
                },
                "friday": {
                    "from": String,
                    "to": String
                },
                "saturday": {
                    "from": String,
                    "to": String
                },
                "sunday": {
                    "from": String,
                    "to": String
                }
            }
        }
    }

output:

    {
        "status": "success" | "error",
        "message": "Created" | err,
        "data": {
            "id": String,
            "name": String,
            "images": String[],
            "address": {
                "street": String,
                "number": String
            },
            "location": [Number, Number],
            "categories": String[], // category ids
            "details": {
                "description": String,
                "images": String[], 
                "menu": String[], // menu item ids
                "hours": {
                    "monday": {
                        "from": String, // ex. "8:00"
                        "to": String // ex. "20:00"
                    },
                    "tuesday": {
                        "from": String,
                        "to": String
                    },
                    "wednesday": {
                        "from": String,
                        "to": String
                    },
                    "thursday": {
                        "from": String,
                        "to": String
                    },
                    "friday": {
                        "from": String,
                        "to": String
                    },
                    "saturday": {
                        "from": String,
                        "to": String
                    },
                    "sunday": {
                        "from": String,
                        "to": String
                    }
                },
                "comments": [] // not implemented, returns empty array
            }
        }
