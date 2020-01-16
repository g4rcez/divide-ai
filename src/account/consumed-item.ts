import uuid from "../helpers/uuid";

export default class ConsumedItem {
  public name: string;
  public id: string;
  public icon: React.ReactNode;
  public value: number;
  public constructor(props: Partial<ConsumedItem> = {}) {
    this.id = uuid();
    this.name = props.name || "";
    this.icon = props.icon || "";
    this.value = props.value || 0;
  }
}
