"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { useProductDetail } from "@/api/useProductDetail";
import ProductDetailHero from "./components/ProductDetailHero";
import ProductDetailImage from "./components/ProductDetailImage";
import ProductSpecsTable from "./components/ProductSpecsTable";
import ProductFeatureChips from "./components/ProductFeatureChips";
import ProductApplicationsList from "./components/ProductApplicationsList";
import RelatedProducts from "./components/RelatedProducts";
import Reveal from "@/Common/Reveal";
import MagneticWrap from "@/Common/MagneticWrap";

export default function ProductDetailClient({
  id,
  productId,
}: {
  id: string;
  productId: string;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useProductDetail(productId);

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
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <ProductDetailHero name={data.name} />
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal>
              <ProductDetailImage image={data.image} name={data.name} />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delay={100}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "text.secondary",
                  lineHeight: 1.75,
                }}
              >
                {data.description}
              </Typography>
              <Divider />
              <ProductSpecsTable specs={data.specs} />
              <ProductFeatureChips features={data.features} />
              <ProductApplicationsList applications={data.applications} />
              <Box sx={{ alignSelf: "flex-start" }}>
                <MagneticWrap>
                  <Button
                    onClick={() =>
                      router.push(`/products/${id}/${productId}/variants`)
                    }
                    variant="contained"
                    sx={{
                      bgcolor: "primary.main",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: "4px",
                      textTransform: "none",
                      px: 3,
                      py: 1.25,
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        boxShadow: "none",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    View All Models
                  </Button>
                </MagneticWrap>
              </Box>
              {data.datasheetId && (
                <Button
                  component="a"
                  href={data.datasheetId}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  sx={{
                    alignSelf: "flex-start",
                    color: "primary.main",
                    borderColor: "primary.main",
                    fontWeight: 700,
                    borderRadius: "4px",
                    textTransform: "none",
                    px: 3,
                    py: 1.25,
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "primary.dark",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Download Datasheet
                </Button>
              )}
            </Box>
            </Reveal>
          </Grid>
        </Grid>
        <Reveal>
          <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <Divider sx={{ mb: { xs: 6, md: 8 } }} />
            <RelatedProducts
              catalogId={id}
              productIds={data.relatedProducts ?? []}
            />
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
