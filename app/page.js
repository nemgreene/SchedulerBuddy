"use client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Dash from "./dash/Dash";

export default function Home() {
  return (
    <Provider store={store}>
      <Dash />
    </Provider>
  );
}
