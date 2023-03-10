import { camelCase } from "change-case";


const camelizeKeys = (obj:any) : any =>  {
    if (Array.isArray(obj)) {
      return obj.map(v => camelizeKeys(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: camelizeKeys(obj[key]),
        }),
        {},
      );
    }
    return obj;
  };
  
  export {camelizeKeys};