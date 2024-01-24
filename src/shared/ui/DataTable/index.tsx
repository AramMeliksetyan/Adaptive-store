import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import TablePaginationActions from "./components/TablePaginationActions";
import {
  IAction,
  IColumn,
  IExpandableColumn,
  ITableProps,
  rowsPerPageOptions,
} from "./constants";
import { useSelector } from "react-redux";
import { selectTableLoadingState } from "store/slicers/common";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import SharedBreadcrumbs from "../Breadcrumbs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BasicTable = <T extends { id: number }, V = undefined>({
  columns,
  data,
  selectable = false,
  sortable = true,
  onChangeSelected,
  paginatedData,
  Filter,
  onChange,
  getActions,
  getExpandableActions,
  filterOptions,
  gridProp = "data",
  totalCount = "totalItemCount",
  enablePagination = true,
  tableTitle = "Basic Table",
  addButtonOnClick,
  expandable = false,
  expandableColumns,
  nestedListProp = "variants",
}: ITableProps<T, V>): JSX.Element => {
  const [collapsedRowID, setCollapsedRowID] = useState(0);
  const filters = filterOptions?.watch();
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const gridData = (paginatedData as any)?.[gridProp] as T[];
  const isTableLoading = useSelector(selectTableLoadingState);
  const dispatch = useAsyncDispatch();

  const handleCheckAll = useCallback(
    (_: any, checked: boolean) => {
      if (checked) {
        setSelectedList(
          enablePagination
            ? gridData?.map((i: T) => i.id) || []
            : data?.map((i) => i.id) || []
        );
      } else {
        setSelectedList([]);
      }
    },
    [data, enablePagination, gridData]
  );

  const handleCheckRow = useCallback((row: T, checked: boolean) => {
    if (checked) {
      setSelectedList((state) => [...state, row.id]);
    } else {
      setSelectedList((state) => state.filter((i) => i !== row.id));
    }
  }, []);

  const handleRowsPerPageChange = (e: any) => {
    const value = e.target.value;

    filterOptions?.reset({
      ...filterOptions.watch(),
      pageNumber: 1,
      pageSize: value,
    });
    onChange?.({ ...filterOptions?.watch() });
  };

  const handleClickAction = useCallback((action: IAction<T>, row: T) => {
    action.onClick(row);
  }, []);

  const getActionColumn = useCallback((): IColumn => {
    return {
      label: "",
      field: "actions",
      layout: (row: T) => {
        const actions = getActions?.(row) || [];
        return (
          <Box sx={{ display: "flex", gap: 2 }}>
            {actions.map((action, index) => {
              return (
                <Button
                  key={index}
                  variant="contained"
                  color={action.color}
                  onClick={() => action.onClick(row)}
                >
                  {action.label}
                </Button>
              );
            })}
          </Box>
        );
      },
    };
  }, [getActions, handleClickAction]);

  const getExpandableActionColumn = useCallback((): IExpandableColumn => {
    return {
      label: "",
      field: "actions",
      layout: (variant: V, row: T) => {
        const actions = getExpandableActions?.(variant, row) || [];
        return (
          <Box sx={{ display: "flex", gap: 2 }}>
            {actions.map((action, index) => {
              return (
                <Button
                  key={index}
                  variant="contained"
                  color={action.color}
                  onClick={() => action.onClick(variant, row)}
                >
                  {action.label}
                </Button>
              );
            })}
          </Box>
        );
      },
    };
  }, [getActions, handleClickAction]);

  const expandableColumnsData = useMemo(() => {
    const hasActions = !!getExpandableActions;

    return hasActions && expandableColumns
      ? [...expandableColumns, getExpandableActionColumn()]
      : expandableColumns;
  }, [expandableColumns, getActionColumn, getExpandableActions]);

  const columnsData = useMemo(() => {
    const hasActions = !!getActions;

    return hasActions ? [...columns, getActionColumn()] : columns;
  }, [columns, getActionColumn, getActions]);

  const handlePageChange = (_: any, pageNumber: number) => {
    filterOptions?.reset({
      ...filters,
      pageNumber: pageNumber + 1,
    });

    onChange?.({ ...filterOptions?.watch() });
  };

  const handleSort = useCallback(
    (prop: string, direction: string) => (_: any) => {
      filterOptions?.reset({
        ...filters,
        sortDirection: direction,
        sortColumn: prop,
      });
      onChange?.({ ...filterOptions?.watch() });
    },
    [filters, onChange, dispatch]
  );

  const noResults = useMemo(() => {
    return !(enablePagination ? gridData?.length : data?.length);
  }, [data?.length, enablePagination, gridData?.length]);

  const generateExpandableColumns = useMemo(() => {
    return (
      <Fragment>
        {expandableColumnsData?.map((column, index) => {
          return (
            <TableCell size="small" key={index} align="left">
              <TableSortLabel disabled={true}>{column.label}</TableSortLabel>
            </TableCell>
          );
        })}
      </Fragment>
    );
  }, [expandableColumnsData]);

  const generateColumns = useMemo(() => {
    return (
      <Fragment>
        {expandable && <TableCell align="left" size="small"></TableCell>}

        {selectable ? (
          <TableCell align="left" size="small">
            {gridData?.length ? (
              <Checkbox
                checked={
                  selectedList?.length ===
                  (enablePagination ? gridData : data)?.length
                }
                onChange={handleCheckAll}
              />
            ) : null}
          </TableCell>
        ) : null}

        {columnsData?.map((column, index) => {
          return (
            <TableCell size="small" key={index} align="left">
              {sortable ? (
                <TableSortLabel
                  disabled={column.field === "actions"}
                  active={filters?.sortColumn === column.field}
                  direction={filters?.sortDirection}
                  onClick={handleSort(
                    column.field,
                    filters?.sortDirection === "asc" ? "desc" : "asc"
                  )}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                <Typography fontSize={12}>{column.label}</Typography>
              )}
            </TableCell>
          );
        })}
      </Fragment>
    );
  }, [
    columnsData,
    data,
    enablePagination,
    filters?.sortColumn,
    filters?.sortDirection,
    handleCheckAll,
    handleSort,
    gridData,
    selectable,
    selectedList?.length,
    sortable,
    expandable,
  ]);

  const generateSingleRow = (row: any) => {
    return (
      <Fragment>
        {expandable ? (
          row?.[nestedListProp]?.length > 0 ? (
            <TableCell size="small" scope="row" sx={{ width: "30px" }}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  if (row?.id === collapsedRowID) {
                    setCollapsedRowID(0);
                  } else {
                    setCollapsedRowID(row?.id);
                  }
                }}
              >
                {row?.id === collapsedRowID ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </TableCell>
          ) : (
            <TableCell
              size="small"
              scope="row"
              sx={{ width: "30px" }}
            ></TableCell>
          )
        ) : null}
        {selectable ? (
          <TableCell size="small" scope="row">
            <Checkbox
              checked={selectedList.includes(row.id)}
              onChange={(_, checked) => handleCheckRow(row, checked)}
            />
          </TableCell>
        ) : null}
        {columnsData?.map((column, index) => {
          return (
            <Fragment key={index}>
              {column?.layout ? (
                <TableCell size="small" scope="row">
                  {column.layout(row)}
                </TableCell>
              ) : (
                <TableCell size="small" scope="row">
                  {column?.field ? row[column.field] : "-"}
                </TableCell>
              )}
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  const generateNestedSingleRow = (variant: V, row: T) => {
    return (
      <>
        {expandableColumnsData?.map((column, index) => {
          return (
            <Fragment key={index}>
              {column?.layout ? (
                <TableCell size="small" scope="row">
                  {column.layout(variant, row)}
                </TableCell>
              ) : (
                <TableCell size="small" scope="row">
                  {column?.field ? variant[column.field] : "-"}
                </TableCell>
              )}
            </Fragment>
          );
        })}
      </>
    );
  };

  const generateRowsPaginated = () => {
    return gridData?.map((row: any, rowIndex) => (
      <Fragment key={rowIndex}>
        <TableRow hover>{generateSingleRow(row)}</TableRow>
        {expandable ? (
          <TableRow>
            <TableCell
              size="small"
              style={{ paddingBottom: 0, paddingTop: 0 }}
              scope="row"
              colSpan={10}
            >
              <Collapse in={row?.id === collapsedRowID} timeout="auto">
                <Box sx={{ my: 1, ml: 15 }}>
                  <Typography variant="h6" gutterBottom>
                    Variants
                  </Typography>
                  <Table sx={{ minWidth: 1000 }} aria-label="variants">
                    <TableHead>
                      <TableRow>{generateExpandableColumns}</TableRow>
                    </TableHead>
                    <TableBody>
                      {row?.[nestedListProp]?.map(
                        (variant: V, index: number) => {
                          return (
                            <TableRow key={index} hover>
                              {generateNestedSingleRow(variant, row)}
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ) : null}
      </Fragment>
    ));
  };

  const generateSimpleRows = () => {
    return data?.map((row, rowIndex) => (
      <TableRow key={rowIndex}>{generateSingleRow(row)}</TableRow>
    ));
  };

  const getPagination = (component: any = "td") => {
    return gridData?.length && enablePagination ? (
      <TablePagination
        labelRowsPerPage={"Rows per page"}
        component={component}
        count={(paginatedData as any)?.[totalCount]}
        rowsPerPage={Number(filters?.pageSize)}
        rowsPerPageOptions={rowsPerPageOptions}
        page={filters?.pageNumber - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
      />
    ) : null;
  };

  useEffect(() => {
    onChangeSelected?.(selectedList);
  }, [onChangeSelected, selectedList]);

  return (
    <Box pt={4}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <Typography variant="h5">{tableTitle}</Typography>
        {!!addButtonOnClick && (
          <Button variant="contained" onClick={addButtonOnClick}>
            Add
          </Button>
        )}
      </Box>
      <Box mb={3}>
        <SharedBreadcrumbs />
      </Box>
      {!!Filter && (
        <Box>
          <Divider />
          <Filter />
        </Box>
      )}
      {isTableLoading ? (
        <Box
          sx={{
            display: "flex",
            height: `calc(100dvh - 200px)`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {!noResults && (
              <TableHead>
                <TableRow>{generateColumns}</TableRow>
              </TableHead>
            )}

            {!noResults ? (
              <TableBody>
                <Fragment>
                  {enablePagination
                    ? generateRowsPaginated()
                    : generateSimpleRows()}
                </Fragment>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell>No data</TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableFooter
              sx={{
                "& p": {
                  margin: 0,
                },
              }}
            >
              <TableRow>{getPagination()}</TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BasicTable;
