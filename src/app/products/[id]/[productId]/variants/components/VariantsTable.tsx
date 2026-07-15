'use client';

import { useState } from 'react';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel,
  TablePagination, Typography, Chip, IconButton, Collapse, Button,
  Popover, FormGroup, FormControlLabel, Checkbox, Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Image from 'next/image';
import { ProductVariant } from '@/api/useProductVariants';

const BRAND = '#E7390F';
const EXPAND_COL_WIDTH = 40;

// Pinned columns and their fixed widths — bump these if your data runs wider.
const PINNED_WIDTHS: Record<string, number> = {
  SKU: 170,
};
const DEFAULT_PINNED_WIDTH = 110;

interface RowProps {
  variant: ProductVariant;
  visibleKeys: string[];
  pinnedKeys: string[];
  thumbnailImage: string;
  getStickyLeft: (key: string) => number | null;
}

function VariantRow({ variant, visibleKeys, pinnedKeys, thumbnailImage, getStickyLeft }: RowProps) {
  const [open, setOpen] = useState(false);
  const image = variant.thumbnailImage || thumbnailImage;
  const rowBg = open ? alpha(BRAND, 0.03) : '#fff';

  return (
    <>
      <TableRow
        hover
        sx={{
          bgcolor: open ? alpha(BRAND, 0.03) : 'inherit',
          '&:hover': { bgcolor: `${alpha(BRAND, 0.02)} !important` },
        }}
      >
        <TableCell
          sx={{
            width: EXPAND_COL_WIDTH,
            py: 1,
            position: 'sticky',
            left: 0,
            zIndex: 2,
            bgcolor: rowBg,
          }}
        >
          <IconButton size="small" onClick={() => setOpen(o => !o)}>
            {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </IconButton>
        </TableCell>

        {visibleKeys.map(key => {
          const isPinned = pinnedKeys.includes(key);
          const stickyLeft = getStickyLeft(key);
          const cellSx = isPinned
            ? {
                py: 1.5,
                fontSize: '0.82rem',
                fontWeight: key === 'SKU' ? 600 : 400,
                whiteSpace: 'nowrap' as const,
                width: PINNED_WIDTHS[key] ?? DEFAULT_PINNED_WIDTH,
                position: 'sticky' as const,
                left: stickyLeft ?? 0,
                zIndex: 2,
                bgcolor: rowBg,
                boxShadow: '2px 0 4px -2px rgba(0,0,0,0.08)',
              }
            : {
                py: 1.5,
                fontSize: '0.82rem',
                whiteSpace: 'nowrap' as const,
              };

          return (
            <TableCell key={key} sx={cellSx}>
              {variant.specs[key] ? (
                key === 'Locking Device' ? (
                  <Chip
                    label={variant.specs[key]}
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      bgcolor: variant.specs[key] === 'With Lock' ? alpha(BRAND, 0.08) : 'rgba(0,0,0,0.04)',
                      color: variant.specs[key] === 'With Lock' ? BRAND : 'text.secondary',
                      borderRadius: '3px'
                    }}
                  />
                ) : variant.specs[key]
              ) : '—'}
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow>
        <TableCell colSpan={visibleKeys.length + 1} sx={{ p: 0, borderBottom: open ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ p: 3, bgcolor: alpha(BRAND, 0.02), borderLeft: `4px solid ${BRAND}` }}>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {image && (
                  <Box sx={{ width: 140, height: 140, flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={image} alt={variant.specs['SKU'] ?? variant.id} width={120} height={120} style={{ objectFit: 'contain' }} />
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.1em', color: BRAND, mb: 2, textTransform: 'uppercase' }}>
                    Specifications
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                    {Object.entries(variant.specs).map(([k, v]) => (
                      <Box key={k}>
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', mb: 0.25 }}>{k}</Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{v}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '4px', bgcolor: BRAND, boxShadow: 'none', px: 3, '&:hover': { bgcolor: '#A8270A', boxShadow: 'none' } }}
                  >
                    Request Quote
                  </Button>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface Props {
  variants: ProductVariant[];
  specKeys: string[];
  thumbnailImage: string;
}

export default function VariantsTable({ variants, specKeys, thumbnailImage }: Props) {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Pin SKU and whatever the price field is called, always first in column order.
  const priceKey = specKeys.find(k => k.toLowerCase() === 'price');
  const pinnedKeys = ['SKU', ...(priceKey ? [priceKey] : [])];
  const allColumns = [...pinnedKeys, ...specKeys.filter(k => !pinnedKeys.includes(k))];
  const visibleKeys = allColumns.filter(k => !hiddenColumns.includes(k));

  const toggleColumn = (key: string) => {
    setHiddenColumns(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...variants].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a.specs[sortKey] ?? '';
    const bv = b.specs[sortKey] ?? '';
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Pinned keys are always at the front of visibleKeys, so we can compute
  // each one's left offset by walking through in order.
  const visiblePinnedKeys = visibleKeys.filter(k => pinnedKeys.includes(k));
  const getStickyLeft = (key: string): number | null => {
    if (!pinnedKeys.includes(key)) return null;
    let left = EXPAND_COL_WIDTH;
    for (const k of visiblePinnedKeys) {
      if (k === key) return left;
      left += PINNED_WIDTHS[k] ?? DEFAULT_PINNED_WIDTH;
    }
    return left;
  };

  const headerBaseSx = {
    bgcolor: alpha(BRAND, 0.04),
    borderBottom: `2px solid ${BRAND}`,
    fontWeight: 700,
    fontSize: '0.72rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    py: 1.5,
    whiteSpace: 'nowrap' as const,
  };

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {/* Column toggle toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Tooltip title="Show/Hide Columns">
          <IconButton size="small" onClick={e => setAnchorEl(e.currentTarget)} sx={{ color: hiddenColumns.length > 0 ? BRAND : 'text.secondary' }}>
            <ViewColumnIcon fontSize="small" />
            {hiddenColumns.length > 0 && (
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: BRAND, ml: 0.5 }}>
                {hiddenColumns.length} hidden
              </Typography>
            )}
          </IconButton>
        </Tooltip>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ p: 2, minWidth: 180 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.secondary' }}>
                Columns
              </Typography>
              {hiddenColumns.length > 0 && (
                <Typography
                  onClick={() => setHiddenColumns([])}
                  sx={{ fontSize: '0.72rem', fontWeight: 700, color: BRAND, cursor: 'pointer' }}
                >
                  Show all
                </Typography>
              )}
            </Box>
            <FormGroup>
              {allColumns.map(key => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      size="small"
                      checked={!hiddenColumns.includes(key)}
                      onChange={() => toggleColumn(key)}
                      sx={{ py: 0.25, '&.Mui-checked': { color: BRAND } }}
                    />
                  }
                  label={<Typography sx={{ fontSize: '0.8rem' }}>{key}</Typography>}
                />
              ))}
            </FormGroup>
          </Box>
        </Popover>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...headerBaseSx,
                  width: EXPAND_COL_WIDTH,
                  position: 'sticky',
                  left: 0,
                  zIndex: 3,
                }}
              />
              {visibleKeys.map(key => {
                const isPinned = pinnedKeys.includes(key);
                const stickyLeft = getStickyLeft(key);
                return (
                  <TableCell
                    key={key}
                    sx={{
                      ...headerBaseSx,
                      width: isPinned ? (PINNED_WIDTHS[key] ?? DEFAULT_PINNED_WIDTH) : undefined,
                      ...(isPinned
                        ? { position: 'sticky', left: stickyLeft ?? 0, zIndex: 3 }
                        : {}),
                    }}
                  >
                    <TableSortLabel
                      active={sortKey === key}
                      direction={sortKey === key ? sortDir : 'asc'}
                      onClick={() => handleSort(key)}
                    >
                      {key}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleKeys.length + 1} align="center" sx={{ py: 8 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>No variants found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map(v => (
                <VariantRow
                  key={v.id}
                  variant={v}
                  visibleKeys={visibleKeys}
                  pinnedKeys={pinnedKeys}
                  thumbnailImage={thumbnailImage}
                  getStickyLeft={getStickyLeft}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      />
    </Box>
  );
}