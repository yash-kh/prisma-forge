# prisma-forge
prisma-forge is a tool used for easily creating query for prisma ORM

You can easily incorporate it with prisma-forge-react

# Installing
```
$ npm install prisma-forge
```

# Example

```
import { generateWhereQuery } from 'prisma-forge';

const filterArr = [
    {
        "column": "title",
        "type": "contains",
        "value": "Hello"
    },
    {
        "column": "published",
        "type": "boolean",
        "value": true
    },
    {
        "column": "createdAt",
        "type": "date",
        "dateObj": {
            "startDate": "2024-03-31T18:30:00.000Z"
        }
    },
    {
        "column": "metaData",
        "type": "JSON_date",
        "dateObj": {
            "startDate": 1711909800000
        },
        "key": "data"
    },
    {
        "column": "authorId",
        "type": "equal",
        "value": 3
    },
    {
        "column": "metaData",
        "type": "JSON_equals",
        "value": "B",
        "key": "group"
    }

    const whereQ = generateWhereQuery(filterArr)

    // whereQ = {
    //    "title": {
    //        "contains": "Hello",
    //        "mode": "insensitive"
    //    },
    //    "published": true,
    //    "createdAt": {
    //        "gte": "2024-03-31T18:30:00.000Z"
    //    },
    //    "AND": [{
    //        "metaData": {
    //            "path": ["data"],
    //            "gte": 1711909800000
    //        }
    //    }, {
    //        "metaData": {
    //            "path": ["group"],
    //            "equals": "B"
    //        }
    //    }],
    //    "authorId": 3
    //}

    const posts = await prisma.post.findMany({
      where: whereQ
    });

    // posts = [
    //    {
    //        "id": 2,
    //        "createdAt": "2024-04-23T08:19:15.632Z",
    //        "updatedAt": "2024-04-23T08:19:15.632Z",
    //        "title": "Hello World",
    //        "content": null,
    //        "published": true,
    //        "authorId": 3,
    //        "metaData": {
    //            "data": 1714039246810,
    //            "group": "B"
    //        }
    //    }
    //]

]
```
