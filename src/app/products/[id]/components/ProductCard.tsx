import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

type ProductCardProps = {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  thumbnailImage?: string;
  tag?: string;
  materialBadge?: string;
  onClick: (id: string) => void;
};

export default function ProductCard({
  id, name, subtitle, description, thumbnailImage, tag, materialBadge, onClick,
}: ProductCardProps) {
  return (
    <Card variant="outlined" sx={{
      borderRadius: 0, height: "100%", display: "flex", flexDirection: "column",
      border: "1px solid #e8e8e8",
      transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        borderColor: "primary.main",
        transform: "translateY(-4px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      },
      "&:hover .product-thumb-img": { transform: "scale(1.06)" },
    }}>
      <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "center",
        bgcolor: "background.paper", p: 3, borderBottom: "1px solid #f0f0f0", minHeight: 220,
        overflow: "hidden",
      }}>
        <CardMedia component="img" image={thumbnailImage} alt={name} className="product-thumb-img"
          sx={{ width: "100%", maxWidth: 200, height: 180, objectFit: "contain", transition: "transform 0.5s ease" }} />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {tag && (
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2, fontSize: 10 }}>
            {tag}
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mt: 0.5, mb: 0.5, fontSize: "1.05rem" }}>
          {name}{subtitle ? ` — ${subtitle}` : ""}
        </Typography>
        {materialBadge && (
          <Box sx={{
            display: "inline-flex", alignItems: "center", bgcolor: "primary.light",
            border: (t) => `1px solid ${t.palette.primary.main}`, borderRadius: 0.5, px: 1.2, py: 0.3, mb: 2,
          }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "primary.dark", letterSpacing: 0.5 }}>
              {materialBadge}
            </Typography>
          </Box>
        )}
        {description && (
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.75, fontSize: "0.88rem" }}>
            {description}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button variant="contained" fullWidth size="small" onClick={() => onClick(id)}
          sx={{ borderRadius: 0, fontWeight: 700, fontSize: 12, letterSpacing: 1, py: 1 }}>
          VIEW RANGE
        </Button>
        <Button variant="outlined" fullWidth size="small" href="/enquiry"
          sx={{ borderColor: "#ddd", color: "text.secondary", borderRadius: 0, fontWeight: 600, fontSize: 12, letterSpacing: 1, py: 1 }}>
          REQUEST QUOTE
        </Button>
      </Box>
    </Card>
  );
}