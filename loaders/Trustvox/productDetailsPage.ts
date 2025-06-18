import { storeId } from "site/constants.tsx";

export interface Props {
  productId: string;
}

export interface Review {
  id: number;
  opinion_title: string;
  opinion: string;
  rate: number;
  locale: string;
  created_at: string;
  upvotes_count: number;
  downvotes_count: number;
  third_party: boolean;
  user: {
    name: string;
  };
  review_photos: Array<{
    id: number;
    thumbnail: string;
    image: string;
    square: string;
  }>;
  sale_item: {
    id: number;
    sku: Record<string, unknown>;
  };
  recommends: "yes" | "no";
  sale: {
    created_at: string;
  };
  comments: Array<{ text: string }>;
  links: Array<{
    rel: string;
    href: string;
  }>;
}

export interface LoaderResponse {
  reviews: Review[];
  aggregateRating: number | null;
}

export default async function loader(
  props: Props,
  _req: Request,
): Promise<LoaderResponse> {
  const { productId } = props;

  if (!storeId || !productId) {
    throw new Error("Missing storeId or productId");
  }

  const headersList = {
    accept: "application/vnd.trustvox-v2+json",
  };

  const url =
    `https://trustvox.com.br/widget/opinions?code=${productId}&store_id=${storeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Trustvox data. Status: ${response.status}, URL: ${url}`,
      );
    }

    const data = await response.json();

    // Log para debug (pode ser removido em produção)
    const reviews: Review[] = data.items;
    const aggregateRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length
      : null;

    console.log("Trustvox API Response:", data);

    return { reviews, aggregateRating };
  } catch (error) {
    console.error("Error fetching Trustvox data:", error);
    //@ts-ignore: any type
    throw new Error(`Error fetching Trustvox data: ${error.message}`);
  }
}
