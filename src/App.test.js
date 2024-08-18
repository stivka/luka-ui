import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./pages/Login";

test("renders login button", () => {
	render(
		<MemoryRouter>
			<Login />
		</MemoryRouter>,
	);
	const visitorCounterElement = screen.getByAltText("Login button");
	expect(visitorCounterElement).toBeInTheDocument();
});
