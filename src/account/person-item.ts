export default class PersonItem {
  public name: string;
  public icon: React.ReactNode;
  public value: number;
  public quantity: number;
  public constructor(props: Partial<PersonItem> = {}) {
    this.name = props.name || "";
    this.icon = props.icon || "";
    this.value = props.value || 0;
    this.quantity = props.quantity || 0;
  }
}
