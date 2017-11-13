---
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tables

表格

[Data tables](https://material.io/guidelines/components/data-tables.html) 显示原始数据集。
它们通常出现在桌面企业产品中。

## Structure （结构）

数据表包含顶部的标题行，列名称，然后是数据行。

如果用户需要选择或操作数据，则复选框应该伴随每一行。

## Basic Table （基础表格）

一个没有虚饰的简单例子，。

{{demo='pages/demos/tables/BasicTable.js'}}

## Sorting & Selecting （排序和选择）

这个例子演示了为s带`Toolbar`的选集使用`Checkbox`和可单击的行。

它使用`TableSortLabel`组件来帮助样式化列标题。

{{demo='pages/demos/tables/EnhancedTable.js'}}

## Advanced use cases （高级用例）

为更高级的用例可以利用[dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/)。它是一个为Material-UI开发的数据网格，具有分页、排序、过滤、分组和编辑功能。
