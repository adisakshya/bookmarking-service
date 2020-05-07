define({ "api": [
  {
    "type": "put",
    "url": "/api/v1/bookmark/tag",
    "title": "add tag to bookmark",
    "version": "1.0.0",
    "name": "add_tag_to_bookmark",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Bookmark ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Tag Title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request PUT http://<domain:port>/api/v1/bookmark/tag \\\n --data-urlencode 'id=6f8b44b749c80311234883b2' \\\n --data-urlencode 'title=someRandomTagTitle'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Bookmark updated\",\n     \"data\": {\n       \"bookmarks\": {\n          \"tags\": [\n            \"someRandomTagTitle\"\n          ],\n          \"_id\": \"5eb3ea9fb901e715145808f5\",\n          \"link\": \"http://localhost\",\n          \"title\": \"someRandomTitle\",\n          \"publisher\": \"someRandomPublisher\",\n          \"createdAt\": \"2020-05-07T11:01:51.675Z\",\n          \"updatedAt\": \"2020-05-07T11:01:51.676Z\",\n          \"__v\": 0\n       }\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "post",
    "url": "/api/v1/bookmark",
    "title": "create new entry for bookmark",
    "version": "1.0.0",
    "name": "create_new_entry_for_bookmark",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request POST http://<domain:port>/api/v1/bookmark \\\n --data-urlencode 'link=http://localhost' \\\n --data-urlencode 'title=someRandomTitle' \\\n --data-urlencode 'publisher=someRandomPublisher'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"New bookmark created\",\n     \"data\": {\n       \"bookmarks\": {\n          \"tags\": [],\n          \"_id\": \"5eb3e44ccbd3184b040e08c5\",\n          \"link\": \"http://localhost\",\n          \"title\": \"someRandomTitle\",\n          \"publisher\": \"someRandomPublisher\",\n          \"createdAt\": \"2020-05-07T10:34:52.490Z\",\n          \"updatedAt\": \"2020-05-07T10:34:52.490Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "delete",
    "url": "/api/v1/bookmark",
    "title": "delete all bookmarks",
    "version": "1.0.0",
    "name": "delete_all_bookmarks",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/bookmark",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Bookmarks deleted\",\n     \"data\": {\n       \"bookmarks\": {\n          \"n\": 1,\n          \"ok\": 1,\n          \"deletedCount\": 1\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "delete",
    "url": "/api/v1/bookmark/item",
    "title": "delete bookmark by ID",
    "version": "1.0.0",
    "name": "delete_bookmark",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Bookmark ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/bookmark/item \\\n --data-urlencode 'id=5eb3e44ccbd3184b040e08c5'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Bookmark deleted\",\n     \"data\": {\n       \"bookmarks\": {\n          \"tags\": [],\n          \"_id\": \"5eb3e44ccbd3184b040e08c5\",\n          \"link\": \"http://localhost\",\n          \"title\": \"someRandomTitle\",\n          \"publisher\": \"someRandomPublisher\",\n          \"createdAt\": \"2020-05-07T10:34:52.490Z\",\n          \"updatedAt\": \"2020-05-07T10:34:52.491Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "get",
    "url": "/api/v1/bookmark",
    "title": "get all bookmarks",
    "version": "1.0.0",
    "name": "get_all_bookmarks",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/bookmark",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Bookmarks found\",\n     \"data\": {\n       \"bookmarks\": [\n            {\n                \"tags\": [],\n                \"_id\": \"5eb3e44ccbd3184b040e08c5\",\n                \"link\": \"http://localhost\",\n                \"title\": \"someRandomTitle\",\n                \"publisher\": \"someRandomPublisher\",\n                \"createdAt\": \"2020-05-07T10:34:52.490Z\",\n                \"updatedAt\": \"2020-05-07T10:34:52.490Z\",\n                \"__v\": 0\n            },\n            {\n                \"tags\": [],\n                \"_id\": \"5eb3e44ccbd3184b040e08c5\",\n                \"link\": \"http://localhosta\",\n                \"title\": \"someAnotherRandomTitle\",\n                \"publisher\": \"someRandomPublisher\",\n                \"createdAt\": \"2020-05-07T10:42:33.490Z\",\n                \"updatedAt\": \"2020-05-07T10:42:33.490Z\",\n                \"__v\": 0\n            }\n        ]\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "get",
    "url": "/api/v1/tag/bookmark",
    "title": "get bookmark details by ID",
    "version": "1.0.0",
    "name": "get_bookmark_details_by_ID",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Bookmark ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/bookmark/item?id=BookmarkID",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Bookmark found\",\n     \"data\": {\n       \"bookmarks\": {\n          \"tags\": [],\n          \"_id\": \"5eb3e44ccbd3184b040e08c5\",\n          \"link\": \"http://localhost\",\n          \"title\": \"someAnotherRandomTitle\",\n          \"publisher\": \"someRandomPublisher\",\n          \"createdAt\": \"2020-05-07T10:34:52.490Z\",\n          \"updatedAt\": \"2020-05-07T10:34:52.491Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "put",
    "url": "/api/v1/bookmark/tag",
    "title": "remove tag from bookmark",
    "version": "1.0.0",
    "name": "remove_tag_from_bookmark",
    "group": "bookmark",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Bookmark ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Tag Title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/bookmark/tag \\\n --data-urlencode 'id=6f8b44b749c80311234883b2' \\\n --data-urlencode 'title=someRandomTagTitle'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Bookmark updated\",\n     \"data\": {\n       \"bookmarks\": {\n          \"tags\": [\n            \"someAlreadyExisitingRandomTagTitle\"\n          ],\n          \"_id\": \"5eb3ea9fb901e715145808f5\",\n          \"link\": \"http://localhost\",\n          \"title\": \"someRandomTitle\",\n          \"publisher\": \"someRandomPublisher\",\n          \"createdAt\": \"2020-05-07T11:01:51.675Z\",\n          \"updatedAt\": \"2020-05-07T11:01:51.676Z\",\n          \"__v\": 0\n       }\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/bookmark/controller.js",
    "groupTitle": "bookmark"
  },
  {
    "type": "get",
    "url": "/api/v1/ping/db",
    "title": "check connection with database",
    "version": "1.0.0",
    "name": "check_connection_with_database",
    "group": "ping",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/ping/db",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Connection with database is successfully established\",\n     \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/ping/controller.js",
    "groupTitle": "ping"
  },
  {
    "type": "get",
    "url": "/api/v1/ping",
    "title": "ping the server",
    "version": "1.0.0",
    "name": "ping_the_server",
    "group": "ping",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/ping",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"message\": \"Pong\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/ping/controller.js",
    "groupTitle": "ping"
  },
  {
    "type": "post",
    "url": "/api/v1/tag",
    "title": "create new entry for tag",
    "version": "1.0.0",
    "name": "create_new_entry_for_tag",
    "group": "tag",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request POST http://<domain:port>/api/v1/tag \\\n --data-urlencode 'title=someRandomTagTitle'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"New tag created\",\n     \"data\": {\n       \"tags\": {\n          \"_id\": \"5e7a33a638b79200123772a1\",\n          \"title\": \"someRandomTagTitle\",\n          \"createdAt\": \"2020-05-07T10:24:12.974Z\",\n          \"updatedAt\": \"2020-05-07T10:24:12.974Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/tag/controller.js",
    "groupTitle": "tag"
  },
  {
    "type": "delete",
    "url": "/api/v1/tag",
    "title": "delete all tags",
    "version": "1.0.0",
    "name": "delete_all_tags",
    "group": "tag",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/tag",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Tags deleted\",\n     \"data\": {\n       \"tags\": {\n          \"n\": 1,\n          \"ok\": 1,\n          \"deletedCount\": 1\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/tag/controller.js",
    "groupTitle": "tag"
  },
  {
    "type": "delete",
    "url": "/api/v1/tag/item",
    "title": "delete tag by ID",
    "version": "1.0.0",
    "name": "delete_tag",
    "group": "tag",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Tag ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/tag/item \\\n --data-urlencode 'id=5e7a33a638b79200123772a1'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Tag deleted\",\n     \"data\": {\n       \"tags\": {\n          \"_id\": \"5e7a33a638b79200123772a1\",\n          \"title\": \"someRandomTagTitle\",\n          \"createdAt\": \"2020-05-07T10:24:12.974Z\",\n          \"updatedAt\": \"2020-05-07T10:24:12.974Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/tag/controller.js",
    "groupTitle": "tag"
  },
  {
    "type": "get",
    "url": "/api/v1/tag",
    "title": "get all tags",
    "version": "1.0.0",
    "name": "get_all_shorten_url_entries",
    "group": "tag",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/tag",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Tags found\",\n     \"data\": {\n        \"tags\": [\n            {\n                \"_id\": \"5e7a33a638b79200123772a1\",\n                \"title\": \"someRandomTagTitle\",\n                \"createdAt\": \"2020-05-07T10:24:12.974Z\",\n                \"updatedAt\": \"2020-05-07T10:24:12.974Z\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"6f8b44b749c80311234883b2\",\n                \"title\": \"someAnotherRandomTagTitle\",\n                \"createdAt\": \"2020-05-07T10:24:12.974Z\",\n                \"updatedAt\": \"2020-05-07T10:24:12.974Z\",\n                \"__v\": 0\n            }\n        ]\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/tag/controller.js",
    "groupTitle": "tag"
  },
  {
    "type": "get",
    "url": "/api/v1/tag/item",
    "title": "get tag details by ID",
    "version": "1.0.0",
    "name": "get_tag_details_by_ID",
    "group": "tag",
    "permission": [
      {
        "name": "all"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Tag ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/tag/item?id=TagID",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Tag found\",\n     \"data\": {\n       \"tags\": {\n          \"_id\": \"6f8b44b749c80311234883b2\",\n          \"title\": \"someRandomTagTitle\",\n          \"createdAt\": \"2020-05-07T10:24:12.974Z\",\n          \"updatedAt\": \"2020-05-07T10:24:12.974Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/bookmark/controllers/tag/controller.js",
    "groupTitle": "tag"
  }
] });
