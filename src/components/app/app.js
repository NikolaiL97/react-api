import { Component } from "react";
import FilmList from "../film-list/film-list";

export default class App extends Component {
  render() {
    return (
			<section className="todoapp">
				<header className="header">
				</header>
				<section className="main">
					<FilmList/>
				</section>
			</section>
    )
  }
}