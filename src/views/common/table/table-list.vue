/*
*该组件实现可编辑表格
*/
<style>
    @import './style/table.less';
</style>

<template>
    <div>
        <Table
                ref="currentRowTable"
               :columns="columnsList"
               :data="thisTableData"
               :loading="isLoading"
               @on-filter-change="filter_change"
               @on-sort-change="sort_change"
               @customized-filter-change="filter_Change"
               @add-click="add_tableRow"
               @on-selection-change="select_one"
               highlight-row
               border
               small
               stripe
               :size="size"
        ></Table>
    </div>
</template>

<script>
    import selectForm from '../form/select-form.vue';
    const editFormButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'primary'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                }
            }
        }, '编辑');
    };

    const editButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: currentRow.editting ? 'success' : 'primary',
                loading: currentRow.saving
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    if (!currentRow.editting) {
                        if (currentRow.edittingCell) {
                            for (let name in currentRow.edittingCell) {
                                currentRow.edittingCell[name] = false;
                                vm.edittingStore[index].edittingCell[name] = false;
                            }
                        }
                        console.log("#####1111111111######\n");
                        vm.edittingStore[index].editting = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    } else {
                        console.log("#####22222222222######\n");
                        console.log(vm.edittingStore[index]["fw_path"]);
                        vm.edittingStore[index].saving = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                        let edittingRow = vm.edittingStore[index];
                        edittingRow.editting = false;
                        edittingRow.saving = false;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                        vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                    }
                }
            }
        }, currentRow.editting ? '保存' : '编辑');
    };
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗?',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    let delTableData = vm.thisTableData.splice(index, 1);
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-delete', delTableData[0]);
                }
            }
        }, [
            h('Button', {
                style: {
                    margin: '0 5px'
                },
                props: {
                    type: 'error',
                    placement: 'top'
                }
            }, '删除')
        ]);
    };
    const incellEditBtn = (vm, h, param) => {
        if (vm.hoverShow) {
            return h('div', {
                'class': {
                    'show-edit-btn': vm.hoverShow
                }
            }, [
                h('Button', {
                    props: {
                        type: 'text',
                        icon: 'edit'
                    },
                    on: {
                        click: (event) => {
                            vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                        }
                    }
                })
            ]);
        } else {
            return h('Button', {
                props: {
                    type: 'text',
                    icon: 'edit'
                },
                on: {
                    click: (event) => {
                        vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    }
                }
            });
        }
    };
    const saveIncellEditBtn = (vm, h, param) => {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'checkmark'
            },
            on: {
                click: (event) => {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
                }
            }
        });
    };
    const cellInput = (vm, h, param, item) => {
        return h('Input', {
            props: {
                type: 'text',
                value: vm.edittingStore[param.index][item.key]
            },
            on: {
                'on-change': (event) => {
                    let key = item.key;
                    vm.edittingStore[param.index][key] = event.target.value;
                }
            }
        });
    };

    export default {
        name: 'tableComp',
        components: {
            selectForm
        },
        props: {
            refs: String,
            columnsList: Array,
            isLoading: {
                type: Boolean,
                default: false
            },
            value: Array,
            url: String,
            editIncell: {
                type: Boolean,
                default: false
            },
            hoverShow: {
                type: Boolean,
                default: false
            },
            optionsList: {},
            size: String
        },
        data () {
            return {
                columns: [],
                thisTableData: [],
                edittingStore: [],
                select_val: String
            };
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                let vm = this;
                let editableCell = this.columnsList.filter(item => {
                    if (item.editable) {
                        if (item.editable === true) {
                            return item;
                        }
                    }
                });
                //console.log('##### this.value #####',this.value);
                let cloneData = JSON.parse(JSON.stringify(this.value));
                let res = [];
                res = cloneData.map((item, index) => {
                    let isEditting = false;
                    if (this.thisTableData[index]) {
                        if (this.thisTableData[index].editting) {
                            isEditting = true;
                        } else {
                            for (const cell in this.thisTableData[index].edittingCell) {
                                if (this.thisTableData[index].edittingCell[cell] === true) {
                                    isEditting = true;
                                }
                            }
                        }
                    }
                    if (isEditting) {
                        return this.thisTableData[index];
                    } else {
                        this.$set(item, 'editting', false);
                        let edittingCell = {};
                        editableCell.forEach(item => {
                            edittingCell[item.key] = false;
                        });
                        this.$set(item, 'edittingCell', edittingCell);
                        return item;
                    }
                });
                this.thisTableData = res;
                this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
                //console.log('###### this.columnsList ######',this.columnsList);
                this.columnsList.forEach(item => {
                    //console.log('###### item#####',item);
                    //console.log('####### item.editable ########',item.editable);
                    if (item.editable) {
                        item.render = (h, param) => {
                            let currentRow = this.thisTableData[param.index];
                            if (!currentRow.editting) {
                                if (this.editIncell) {
                                    return h('Row', {
                                        props: {
                                            type: 'flex',
                                            align: 'middle',
                                            justify: 'center'
                                        }
                                    }, [
                                        h('Col', {
                                            props: {
                                                span: '22'
                                            }
                                        }, [
                                            !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item)
                                        ]),
                                        h('Col', {
                                            props: {
                                                span: '2'
                                            }
                                        }, [
                                            currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param)
                                        ])
                                    ]);
                                } else {
                                    return h('span', currentRow[item.key]);
                                }
                            } else {
                                if (item.selectable) {
                                    // console.log(param.index);
                                    // console.log(currentRow['management']);
                                    return h(selectForm, {
                                        props: {
                                            clearable: true,
                                            optionList: this.optionsList[item.key],
                                            selectOption:this.optionsList[item.key][0].value,
                                        },
                                        on: {
                                            'select-changed': (event) => {
                                                let key = param.column.key;
                                                vm.edittingStore[param.index][key] = event;
                                            }
                                        }
                                    });
                                    //return h(Cascader,[]);
                                }
                                else {
                                    return h('Input', {
                                        props: {
                                            type: 'text',
                                            value: currentRow[item.key]
                                        },
                                        on: {
                                            'on-change': (event) => {
                                                let key = param.column.key;
                                                vm.edittingStore[param.index][key] = event.target.value;
                                            }
                                        }
                                    });
                                }
                            }
                        };
                    }
                    //console.log('###### item handle#####',item.handle);
                    if (item.handle) {
                        //console.log('####### 1 ######');
                        item.render = (h, param) => {
                            //console.log('####### 2 ######');
                            let currentRowData = this.thisTableData[param.index];
                            //console.log('##### item.handle.length ######',item.handle.length);
                            if (item.handle.length === 2) {
                                if ((item.handle[0] !== 'editForm') && (item.handle[1] !== 'editForm')) {
                                    return h('div', [
                                        editButton(this, h, currentRowData, param.index),
                                        deleteButton(this, h, currentRowData, param.index)
                                    ]);
                                    //console.log('####### 1 ######');
                                }
                                else {
                                    return h('div', [
                                        editFormButton(this, h, currentRowData, param.index),
                                        deleteButton(this, h, currentRowData, param.index)
                                    ]);
                                    //console.log('####### 2 ######');
                                }
                            } else if (item.handle.length === 1) {
                                if (item.handle[0] === 'edit') {
                                    //console.log('#######32444444444444 ######');
                                    return h('div', [
                                        editButton(this, h, currentRowData, param.index)
                                    ]);
                                }else if (item.handle[0] === 'editForm') {
                                    return h('div', [
                                        editFormButton(this, h, currentRowData, param.index)
                                    ]);
                                }else {
                                    return h('div', [
                                        deleteButton(this, h, currentRowData, param.index)
                                    ]);
                                }
                            }
                        };
                    }
                });
            },
            handleBackdata (data) {
                let clonedData = JSON.parse(JSON.stringify(data));
                clonedData.forEach(item => {
                    delete item.editting;
                    delete item.edittingCell;
                    delete item.saving;
                });
                return clonedData;
            },
            filter_change (filter) {
                this.$emit('click-filter-change', filter.key, filter._filterChecked);
            },
            sort_change(sort) {
                this.$emit('click-sort-change', sort.key, sort.order);
            },
            filter_Change(event) {
                this.$emit('customized-filter-change', event);
            },
            add_tableRow(event) {
                console.log(event);
            },
            parentHandle(event) {
                //console.log('#####table list######',event);
                this.$refs.currentRowTable.clearCurrentRow();
            },
            select_one:function(selection){
                //this.edittingStore[1].editting = true;
                //this.thisTableData = JSON.parse(JSON.stringify(this.edittingStore));
                //console.log(selection);
                this.$emit('select-one', selection);
                //console.log("this is  select one\n");
            }
        },
        watch: {
            value (data) {
                this.init();
            }
        }
    };
</script>