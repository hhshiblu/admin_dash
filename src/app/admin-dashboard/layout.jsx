import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return <Sidebar children={children} />;
}

export default RootLayout;
