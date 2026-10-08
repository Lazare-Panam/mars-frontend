"use client";

import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { useProductDetail } from "@/api/useProductDetail";
import ProductDetailHero from "../[id]/[productId]/components/ProductDetailHero";
import { productCrumbs } from "@/lib/breadcrumbs";
import ProductDetailImage from "../[id]/[productId]/components/ProductDetailImage";
import ProductSpecsTable from "../[id]/[productId]/components/ProductSpecsTable";
import ProductFeatureChips from "../[id]/[productId]/components/ProductFeatureChips";
import ProductApplicationsList from "../[id]/[productId]/components/ProductApplicationsList";
import { PRODUCT_MAXW } from "@/Common/product/ProductPageHero";
import RelatedProducts from "../[id]/[productId]/components/RelatedProducts";
interface Props {
  id: string;
}

export default function ProductDetailContent({ id }: Props) {
  const { data, isLoading, isError } = useProductDetail(id);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Failed to load product.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      <ProductDetailHero
        name={data.name}
        breadcrumbs={productCrumbs({ categoryId: id })}
        actions={[
          { label: "View All Models", href: `/products/${id}/variants` },
          { label: "Request a Quote", href: "/contact#enquiry" },
        ]}
      />
      <Box
        sx={{
          maxWidth: PRODUCT_MAXW,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 7 },
        }}
      >
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
              <ProductDetailImage image={data.image} name={data.name} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  color: "text.secondary",
                  lineHeight: 1.8,
                }}
              >
                {data.description}
              </Typography>
              <ProductSpecsTable specs={data.specs} />
              <ProductFeatureChips features={data.features} />
              <ProductApplicationsList applications={data.applications} />
              <Button
                // A real link (not router.push) so crawlers can follow it.
                component={Link}
                href={`/products/${id}/variants`}
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: "10px",
                  textTransform: "none",
                  px: 3.5,
                  py: 1.4,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
                }}
              >
                View All Models
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Divider sx={{ mb: { xs: 6, md: 8 } }} />
          <RelatedProducts
            catalogId={id}
            productIds={data.relatedProducts ?? []}
          />
        </Box>
      </Box>
    </Box>
  );
}
