import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import WithNav from "./Layout/WithNav";
import Parentroute from "./Layout/Parentroute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";

// import HoUnitInvoices from "./pages/Production/HoAccounts/HoUnitInvoices/HoUnitInvoices";


import UnitDetails from "./pages/Production/HoAccounts/SetUp/UnitList/UnitDetails";
import TaxMasterCall from "./pages/Production/HoAccounts/SetUp/Taxes/TaxMasterCall";
import Sync from "./pages/Production/HoAccounts/SetUp/Sync/Sync";
import HoAccounts from "./pages/Production/HoAccounts/Ho/HoAccounts";
import HoUnitInvoices from "./pages/Production/HoAccounts/Ho/HoUnitInvoices/HoUnitInvoices";
import MonthlyReport from "./pages/Production/HoAccounts/Ho/MonthlyReport/MonthlyReport";
import RvAdjustmentForm from "./pages/Production/HoAccounts/Ho/UnitRvAdjustment/RvAdjustmentForm";

import CreateNewCallFile from "./pages/Production/HoAccounts/Ho/HO_PRV/CreateNew/CreateNewCallFile";
import SyncCall from "./pages/Production/HoAccounts/Sync/SyncCall";
// import TallyExportForm from "./pages/Production/HoAccounts/Ho/TallyExport/TallyExportForm";
import TallyExportCall from "./pages/Production/HoAccounts/Ho/TallyExport/TallyExportCall";
import UnitReceiptListForm from "./pages/Production/HoAccounts/Ho/UnitReciptList/UnitReceiptListForm";
import OpenVoucher from "./pages/Production/HoAccounts/Ho/UnitReciptList/OpenVoucher";
import CompanyListFormTables from "./pages/Production/HoAccounts/Tally/CompanyList/CompanyListFormTables";
import UnitSyncForm from "./pages/Production/HoAccounts/Ho/UnitSync/UnitSyncForm";


// import SyncCall from "./pages/Production/HoAccounts/Ho/Sync/SyncCall";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route path="/home" element={<Home />} />

        <Route element={<WithNav />}>
          <Route path="/HOAccounts" element={<Parentroute />}>










            <Route path="SetUp">
              <Route index={true} element={<HoAccounts />} />
              <Route path="UnitInvoiceList" element={<HoUnitInvoices />} />

              <Route path="UnitList" element={<UnitDetails />} />
              <Route path="Tax_Master" element={<TaxMasterCall />} />
              <Route path="Sync" element={<Sync />} />
            </Route>

            <Route path="HO">
              <Route index={true} element={<HoAccounts />} />
              <Route path="UnitInvoiceList" element={<HoUnitInvoices />} />
              <Route path="MonthlyReport" element={<MonthlyReport />} />
              <Route path="RvAdjustment" element={<RvAdjustmentForm />} />
              <Route path="TallyExport" element={<TallyExportCall />} />
              <Route path="UnitReciptList" element={<OpenVoucher />} />
              <Route path="openvoucher" element={<UnitReceiptListForm />} />
              <Route path="UnitSync" element={<UnitSyncForm />} />
              <Route path="HOPrv">
                <Route path="CreateNew" element={<CreateNewCallFile />} />
              </Route>
            </Route>

            <Route path="Sync">
              <Route index={true} element={<HoAccounts />} />
              <Route path="ShowSync" element={<SyncCall />} />
            </Route>

            <Route path="Tally">
              <Route index={true} element={<HoAccounts />} />
              <Route path="CompanyList" element={<CompanyListFormTables />} />
            </Route>





            {/* <Route path="TallyExport" element={<TallyExportForm/>} /> */}












          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
