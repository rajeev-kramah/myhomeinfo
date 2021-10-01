import React, { useEffect } from 'react';
import { connect } from "react-redux";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
//import MaterialTable from 'material-table';



class WarrantyTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentWillMount() {
        if(this.props.tableId != "amortization"){
            var data = {"id":true};
            this.props.getSingleData(data);
        }
    }

    handleRowClick(id){
        console.log("clciekee")
        if(this.props.tableId != "amortization"){
            var data = {"id":id};
            this.props.getSingleData(data);
        }
    }

    componentDidUpdate(){
        if(this.props.tableId != "amortization"){
            var data = {"id":true};
            this.props.getSingleData(data);
        }
       
    }

   

    render(){
        const tableData =  {
            data : this.props.data,
            columns : this.props.columns
        }
        return (
            <DataTableExtensions
            {...tableData}
            export = {true}
            print = {false}
            filterPlaceholder= {"Search"}
            >
            <DataTable
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                striped ={true}
                filterHidden={true}
                onRowClicked ={(row)=>this.handleRowClick(row.id)}
              
            />
            </DataTableExtensions>
                  
        )
  }
} 

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WarrantyTable);