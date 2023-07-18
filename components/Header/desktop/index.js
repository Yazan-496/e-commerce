import HeaderWithoutSearch from "./HeaderWithoutSearch";
import HeaderWithSearch from "./HeaderWithSearch";
import HeaderCheckout from "./HeaderCheckout";
const Header = ({ loading, collection, categories, checkout }) => {
  return (
    <>
      {!collection && !checkout ? (
        <HeaderWithoutSearch loading={loading} />
      ) : checkout ? (
        <HeaderCheckout />
      ) : (
        <HeaderWithSearch loading={loading} categories={categories} />
      )}
    </>
  );
};

export default Header;
