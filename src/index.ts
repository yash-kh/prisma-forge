import { WhereFilterArrObj, WhereFilterType } from "./interface/query";

export function generateWhereQuery(queryArr: WhereFilterArrObj[]) {
  let query: Record<string, any> = {};

  queryArr.forEach((filter) => {
    if (filter.type === WhereFilterType.JSON_equals) {
      if (
        typeof filter.value === "string" &&
        String(filter.value).startsWith("!")
      ) {
        const notQur = {
          [filter.column]: {
            path: [filter.key],
            contains: filter.value.slice(1),
          },
        };

        query.NOT = [...(query.NOT || []), notQur];
      } else {
        const andQur = {
          [filter.column]: {
            path: [filter.key],
            equals: filter.value,
          },
        };
        query.AND = [...(query.AND || []), andQur];
      }
    } else if (filter.type === WhereFilterType.JSON_date && filter.dateObj) {
      const andQur = {
        [filter.column]: {
          path: [filter.key],
          gte: filter.dateObj.startDate,
          lte: filter.dateObj.endDate,
        },
      };
      query.AND = [...(query.AND || []), andQur];
    } else if (filter.type === WhereFilterType.equal) {
      query[filter.column] = filter.value;
    } else if (filter.type === WhereFilterType.contains) {
      if (
        typeof filter.value === "string" &&
        String(filter.value).startsWith("!")
      ) {
        const notQur = {
          [filter.column]: {
            contains: filter.value.slice(1),
            mode: "insensitive",
          },
        };

        query.NOT = [...(query.NOT || []), notQur];
      } else {
        query[filter.column] = {
          contains: filter.value,
          mode: "insensitive",
        };
      }
    } else if (filter.type === WhereFilterType.date && filter.dateObj) {
      query[filter.column] = {
        gte: filter.dateObj.startDate,
        lte: filter.dateObj.endDate,
      };
    } else if (filter.type === WhereFilterType.boolean) {
      query[filter.column] = filter.value;
    }
  });

  return query;
}
