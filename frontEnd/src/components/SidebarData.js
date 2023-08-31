import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiFoodMenu } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { BsPersonFill, BsFillGearFill, BsScrewdriver } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { DiOpenshift } from "react-icons/di";
import { MdReport } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md"
import { BsListCheck } from "react-icons/bs";
import { BiGitMerge } from "react-icons/bi";
import { SiGoogletagmanager } from "react-icons/si";
import { BsServer } from "react-icons/bs";
import { FiCpu } from "react-icons/fi"
import { VscServerProcess } from "react-icons/vsc"
import { FiGitPullRequest } from "react-icons/fi"
import { AiOutlineOrderedList } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { FaDropbox } from "react-icons/fa";
import { GoReport } from "react-icons/go"
import { AiOutlineSchedule } from "react-icons/ai"
import { GiLaserPrecision } from "react-icons/gi"
import { HiCubeTransparent } from "react-icons/hi"
import { AiFillSchedule } from "react-icons/ai"

export const customerSidebar = [


    
      {
        title: "Setup",
        icon: <DiOpenshift />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        // icon: <FiEdit />,
        subNav: [


          {
            title: "Unit_List",
            path: "/HOAccounts/SetUp/UnitList",
            // icon: <FiEdit />,
          },
          {
            title: "Taxes",
            path: "/HOAccounts/SetUp/Tax_Master",
            // icon: <FiEdit />,
          },
          {
            title: "Sync",
            path: "/HOAccounts/SetUp/sync",
            // icon: <FiEdit />,
          }
        ]
      },


      {
        title: "HO",
        icon: <DiOpenshift />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        // icon: <FiEdit />,
        subNav: [
          {
            title: "Unit_Invoice_List",
            path: "/HOAccounts/HO/UnitInvoiceList",
            // icon: <FiEdit />,
          },
          {
            title: "Monthly_Report",
            path: "/HOAccounts/HO/MonthlyReport",
            // icon: <FiEdit />,
          },
          {
            title: "Unit_Rv_Adjustment",
            path: "/HOAccounts/HO/RvAdjustment",
            // icon: <FiEdit />,
          },
          {
            title: "Tally_Export",
            path: "/HOAccounts/HO/TallyExport",
            // icon: <FiEdit />,
          },
          {
            title: "Unit_Recipt_List",
            path: "/HOAccounts/HO/UnitReciptList",
            // icon: <FiEdit />,
          },
          {
            title: "Unit_Sync",
            path: "/HOAccounts/HO/UnitSync",
            // icon: <FiEdit />,
          },
          {
            title: "HO_PRV",
            icon: <DiOpenshift />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            // icon: <FiEdit />,
            subNav: [
              {

                title: "Create_New",
                path: "/HOAccounts/HO/HOPrv/CreateNew",
                // icon: <FiEdit />,

              },

            ]
          },




        ]
      },


      {
        title: "Sync",
        icon: <DiOpenshift />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        // icon: <FiEdit />,
        subNav: [
          {
            title: "Show_Sync_status-",
            path: "/HOAccounts/Sync/ShowSync",
            // icon: <FiEdit />,
          },
        ]
      },


      {
        title: "Tally",
        icon: <DiOpenshift />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        // icon: <FiEdit />,
        subNav: [
          {
            title: "Company_List",
            path: "/HOAccounts/Tally/CompanyList",
            // icon: <FiEdit />,
          },
        ]
      }


    










  // {
  //   title: "Fabrication",
  //   path: "/production/fabrication",
  //   icon: <BsScrewdriver />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "3D Schedules",
  //       path: "/customer/custinvandpayments",
  //       icon: <AiOutlineSchedule/>,
  //     },
  //     {
  //       title: "Laser Welding",
  //       path: "/customer/outstandings",
  //       icon: <GiLaserPrecision />,
  //     },
  //     {
  //       title: "Fabrication",
  //       path: "/customer/outstandings",
  //       icon: <HiCubeTransparent/>,
  //     },
  //     {
  //       title: "Scheduler",
  //       path: "/customer/outstandings",
  //       icon: <AiFillSchedule/>,
  //     },
  //   ]
  // },
  // {
  //   title: "Profile",
  //   path: "/production/profile",
  //   icon: <BsPersonFill />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "Schedules List",
  //       path: "/customer/custinvandpayments",
  //       // icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Shift Manager",
  //       path:  "production/production/shiftmanager",
  //       icon: <SiGoogletagmanager />,
  //     },
  //   ]
  // },
  // {
  //   title: "Service",
  //   path: "/production/services",
  //   icon: <MdHomeRepairService/>,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "Schedules List",
  //       path: "/customer/custinvandpayments",
  //       // icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: "Shift Manager",
  //       path: "production/production/shiftmanager",
  //       icon: <SiGoogletagmanager />,
  //     },
  //   ]
  // },

];

export const adminSidebar = [
  {
    title: "Access",
    icon: <MdIcon.MdOutlineSecurity />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Menu Roles",
        path: "/admin/menuRoles",
        icon: <AiIcons.AiOutlineMenuFold />,
      },
    ],
  },
  {
    title: "Users",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Roles",
        path: "/admin/roles",
        icon: <VscTypeHierarchySub />,
      },
      {
        title: "Menus",
        path: "/admin/menus",
        icon: <BiFoodMenu />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <HiUsers />,
      },
    ],
  },
];
