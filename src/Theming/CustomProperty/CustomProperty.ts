import { getPascalCase } from "../Generator/utils";

export type CustomPropertyValueType = string | number | Array<string | number>;
export class CustomProperty {
  private _name!: string;
  private _value!: CustomPropertyValueType;
  private _parse!: boolean;
  private _extendPath: string | undefined;

  constructor(name: string, value: CustomPropertyValueType, extend?: string, parse: boolean = true) {
    this.name(name);
    this.value(value);
    this.extend(extend);
    this.parse(parse);
  }

  /**
   * Sets the name of this .
   *
   * @param {string} name
   * @returns {this}
   * @memberof CustomProperty
   */
  name(name: string): this {
    this._name = name;

    return this;
  }

  /**
   * Sets the value of this custom property.
   *
   * @param {CustomPropertyValueType} value
   * @returns {this}
   * @memberof CustomProperty
   */
  value(value: CustomPropertyValueType): this {
    this._value = value;

    return this;
  }

  /**
   * Will parse the value and export it to a string.
   *
   * @param {boolean} value
   * @returns {this}
   * @memberof CustomProperty
   */
  parse(value: boolean): this {
    this._parse = value;

    return this;
  }

  /**
   * Adds this variable in the Tailwind configuration, at the given path (using dot syntax).
   *
   * @param {string} [path]
   * @returns {this}
   * @memberof CustomProperty
   */
  extend(path?: string): this {
    this._extendPath = path;

    return this;
  }

  /**
   * This custom property is extending the configuration.
   *
   * @returns {boolean}
   * @memberof CustomProperty
   */
  extends(): boolean {
    return !!this._extendPath;
  }

  /**
   * Gets a computed version of the custom property value.
   *
   * @readonly
   * @type {string}
   * @memberof CustomProperty
   */
  get computed(): string {
    if (this._parse || ['string', 'number'].includes(typeof this._value)) {
      return this._value.toString();
    }

    return (<Array<any>>this._value).join(',');
  }

  /**
   * Gets the path to which this custom property will extend.
   *
   * @readonly
   * @type {string}
   * @memberof CustomProperty
   */
  get extendPath(): string {
    let name: string = getPascalCase(this._name);
    return this._extendPath ? `${this._extendPath}.${name}` : name;
  }

  /**
   * Gets the name of this custom property.
   *
   * @returns {string}
   * @memberof CustomProperty
   */
  getName(): string {
    return this._name;
  }

  /**
   * Gets the value of this custom property.
   *
   * @returns {CustomPropertyValueType}
   * @memberof CustomProperty
   */
  getValue(): CustomPropertyValueType {
    return this._value;
  }
}
