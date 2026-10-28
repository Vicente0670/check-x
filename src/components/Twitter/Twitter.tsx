import page from "./page.module.css";
import type { Twitter } from "../../MessageTypes";

export default function TwitterCard(props: Twitter) {
  return (
    <section className={`${page.main} ${props.card ?? "summary"}`}>
      <div className={page.header}>
        <small>Twitter</small>
      </div>
      <div className={page.content}>
        <div className={page.image}>
          <img src={props.image ?? "unknown.svg"} alt={props.alt} />
        </div>
        <div className={page.text}>
          <a>{props.url}</a>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
      </div>
    </section>
  )
}