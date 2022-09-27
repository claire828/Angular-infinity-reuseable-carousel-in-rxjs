
 class _GenericExtend<T extends object> {
    constructor(data: T) {
      //const proto = { ..._GenericExtend.prototype };
      //Object.assign(proto, Object.getPrototypeOf(data));
      //Object.setPrototypeOf(this, proto);
     // Object.assign(this, data);
      //深度索引，將obj的value替換為path,這樣多國語言才能轉換
      Object.assign( this, this.transformObjectToPath('', data ));
    }
   private concatIfExistsPath(path: string, suffix: string): string {
    return path ? `${path}.${suffix}` : suffix;
  }
  
  private transformObjectToPath<T extends object | string>(
    suffix: string,
    objectToTransformOrEndOfPath: T,
    path = ''
  ): T {
    return typeof objectToTransformOrEndOfPath === 'object'
      ? Object.entries(objectToTransformOrEndOfPath).reduce(
          (objectToTransform, [key, value]) => {
            Object(objectToTransform)[key] = this.transformObjectToPath(
              key,
              value,
              this.concatIfExistsPath(path, suffix)
            );
  
            return objectToTransform;
          },
          {} as T
        )
      : (this.concatIfExistsPath(path, suffix) as T);
  }
    
  }
  
/* export function GenericClass<T>(): new()=> T {
    return class {} as any;
  } */

type GenericExtend<T extends object> = _GenericExtend<T> & T;
 export const GenericExtend: new <T extends object>(data: T) => GenericExtend<T> = _GenericExtend as any;
  
  