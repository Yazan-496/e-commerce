import ProductDetailsPage from "./content";
import axois from "axios";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { slug } = params;

  // fetch data

  const product = await axois
    .get(
      `https://productionadmin.clearance.ae/api/v10/products/details/${slug}`
    )
    .then((res) => {
      return res.data.data;
    });
  const previousImages = product.images || [];
  return {
    title: product.name,
    openGraph: {
      images: previousImages,
    },
    icons: {
      icon: "https://www.clearance.ae/storage/company/2022-04-24-62659f15aff38.png",
    },
  };
}

const ProductDetailsDesktop = () => {
  return <ProductDetailsPage />;
};

export default ProductDetailsDesktop;
