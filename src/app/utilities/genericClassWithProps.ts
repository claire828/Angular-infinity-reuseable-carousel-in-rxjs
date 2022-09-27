
 class _GenericClassWithProps<T> {
    constructor(data: T) {
      const proto = { ..._GenericClassWithProps.prototype };
      Object.assign(proto, Object.getPrototypeOf(data));
      Object.setPrototypeOf(this, proto);
      Object.assign(this, data);
    }
   // GenericMethod() { }
  }
  
type genericClassWithProps<T> = _GenericClassWithProps<T> & T;
 export const GenericClassWithProps: new <T>(data: T) => genericClassWithProps<T> = _GenericClassWithProps as any;
  
  