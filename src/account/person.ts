import PersonItem from "./person-item";

export default class Person {
  public name: string;
  public itens: PersonItem[];
  public total: number;
  public constructor(props: Partial<Person> = {}) {
    this.name = props.name || "";
    this.itens = props.itens || [];
    this.total = props.total || 0;
  }
}
