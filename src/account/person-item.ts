export default class PersonItem {
  public id: string;
  public name: string;
  public value: number;
  public quantity: number;
  public constructor(props: Partial<PersonItem> = {}) {
    this.id = props.id || "";
    this.name = props.name || "";
    this.value = props.value || 0;
    this.quantity = props.quantity || 0;
  }
}
