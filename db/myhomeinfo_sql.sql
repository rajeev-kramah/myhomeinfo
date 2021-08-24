-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jul 08, 2021 at 11:43 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myhomeinfo`
--

-- --------------------------------------------------------

--
-- Table structure for table `amortization`
--

DROP TABLE IF EXISTS `amortization`;
CREATE TABLE IF NOT EXISTS `amortization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pmtno` int(11) DEFAULT NULL,
  `paymentdate` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `beginingamount` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `scheduledpayment` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `extrapayment` datetime DEFAULT NULL,
  `totalpayment` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `principal` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `interest` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `endingbalance` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `cumulativeinterest` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `loan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactgroup`
--

DROP TABLE IF EXISTS `contactgroup`;
CREATE TABLE IF NOT EXISTS `contactgroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subgroup` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `groupname` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contactgroup_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `contactgroup`
--

INSERT INTO `contactgroup` (`id`, `subgroup`, `groupname`, `house_id`) VALUES
(1, 'Income', 'Income', NULL),
(2, 'Expenses', 'Expenses', NULL),
(34, 'Rent', 'Income', NULL),
(35, 'Rent1', 'Income&Rent', NULL),
(36, 'Sales- comissition', 'Income', NULL),
(38, 'Rent11', 'Income&Rent&Rent1', NULL),
(39, 'Sales1', 'Income&Sales- comissition', NULL),
(40, 'Sales11', 'Income&Sales- comissition&Sales1', NULL),
(41, 'sales111', 'Income&Sales- comissition&Sales1&Sales11', NULL),
(42, 'sales111', 'Income&Sales- comissition&Sales1&Sales11', NULL),
(43, 'Expenses1', 'Expenses', NULL),
(44, 'Warranty', 'Expenses', NULL),
(45, 'Insurance', 'Expenses', NULL),
(46, 'Loans', 'Expenses', NULL),
(47, 'Mortgage', 'Expenses&Loans', NULL),
(48, 'Test1', 'Expenses&Loans', NULL),
(49, 'Property-tax', 'Expenses', 85);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contactperson` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `landline` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `companyname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mono` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `url` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `comment` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `add_to_home_cost` tinyint(1) NOT NULL DEFAULT '0',
  `transaction_type` varchar(100) COLLATE utf8_danish_ci DEFAULT NULL,
  `transaction_amount` varchar(20) COLLATE utf8_danish_ci DEFAULT NULL,
  `auto_post` tinyint(1) DEFAULT NULL,
  `posting_frequency` varchar(50) COLLATE utf8_danish_ci DEFAULT NULL,
  `posting_date` varchar(5) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  `streetName` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `state` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `country` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `houseno` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacts_house1_idx1` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `groupname`, `contactperson`, `landline`, `email`, `companyname`, `address`, `mono`, `url`, `comment`, `add_to_home_cost`, `transaction_type`, `transaction_amount`, `auto_post`, `posting_frequency`, `posting_date`, `house_id`, `streetName`, `city`, `state`, `country`, `houseno`) VALUES
(30, 'Expenses&Realtor', 'Steve Angelil', '', 'tbd@exprealty.com', 'Exp Realty', '', '999-888-7777', '', '', 1, '', '', 0, 'null', 'null', 84, 'null', 'null', 'null', 'null', 'null'),
(31, 'Expenses&Insurance', 'Kriste', '', 'kriste@fednat.com', 'Fed Nat', '', '999-888-777', '', '', 1, '', '', 0, 'null', 'null', 84, 'null', 'null', 'null', 'null', 'null'),
(32, 'Expenses&Realtor', 'Robert Foutz', '', 'robertfoutz@gmail.com', 'Foutz', '', '999-888-7777', '', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(33, 'Loans&Mortgage', 'Wells Fargo', '', 'tbd@wellsfargo.com', 'Wells Fargo', '', '800-999-8888', '', '', 1, NULL, NULL, NULL, NULL, NULL, 84, NULL, NULL, NULL, NULL, NULL),
(34, 'Expenses&Insurance', 'William', '', 'tbd@happyhelper.com', 'Happy Helper', '', '999-888-7777', '', '', 1, NULL, NULL, NULL, NULL, NULL, 84, NULL, NULL, NULL, NULL, NULL),
(40, 'Expenses&HOA-Fees', 'Permier Association Management', '407-333-7787', 'tbd', 'Permier Association Management', '', '407-333-7787', 'https://portal.premiermgmtcfl.com/home_v2/Log', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(41, 'Loans&Mortgage', 'AD Mortgage', '', 'tbd@admortgage.com', 'AD Mortgage', '', '999-999-9999', '', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(42, 'Expenses&Insurance', 'Fran', '954-424-4140', 'fdaley@acg.aaa.com', 'AAA Insurance', '', '954-815-6969', '', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(43, 'Expenses&Property-tax', 'AD Mortgage Escrow', '', 'tbd@admortgage.com', 'AD Mortgage Escrow', '', '999-999-9999', '', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(44, 'Expenses&Property-tax', 'Seminole County Tax Collector', '', 'tdb@seminole.com', 'Seminole County Tax Collector', '', '999-999-9999', '', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(45, 'Expenses&Realtor', 'Cassie Flaming', '407-398-6912', 'cassie@theclosingagent.com', 'The Closing Agent', '1150', '407-948-9600', '', 'Fax - 407-398-6924 Zip - 32714', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(46, 'Expenses&Realtor', 'Mark', '', 'tbd', '4746 - Seller', '', '999-999-9999', '', '', 1, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL),
(47, '', 'Manohar123', '9876543210', 'Mksnitc@gmail.com', 'Myhomeinfo123', '', '98765432', '', '', 1, 'TEst1', '1122222', 0, 'Monthly', '16', 85, NULL, NULL, NULL, NULL, NULL),
(48, 'Expenses&Warranty', 'Manohar', '', 'mksnitc@gmail.com', 'MyHomeInfo', '', '9876543210', 'http://localhost:3000/contact-form', '', 1, 'ABC', '222222.00', 0, 'Monthly', '18', 84, 'Test2', 'ABCD', 'Alberta', 'Canada', '1111'),
(51, 'Expenses&Insurance', 'Manohar', '', 'mksnitc@gmail.com', 'ABC', '', '9876543210', '', '', 0, '', '0.00', 0, '', '', 84, '', '', '', 'Canada', ''),
(52, 'Expenses&Insurance', 'XYZ Contact', '', 'mksnitc@gmail.com', 'XYZ', '', '9876543210', '', '', 0, '', '0.00', 0, '', '', 84, 'undefined', '', 'undefined', 'Canada', ''),
(53, 'Expenses&Loans', 'Mksingh', '', 'mksnitc@gmail.com', 'ABC Loan', '', '987-654-3210', '', '', 1, 'ABC', '111110.00', 0, 'Monthly', '18', 84, '', '', '', 'Canada', ''),
(54, 'Expenses&Loans', 'Escrow Test1', '', 'mksnitc@gmail.com', 'Escrow Test', '', '987-654-3320', '', '', 0, '', '0.00', 0, '', '', 84, 'undefined', '', 'undefined', 'Canada', ''),
(55, 'Expenses&Loans', 'rtretretret', '', 'fdgfdgdf@gmail.com', 'Test', '', '768-686-7876', '', '', 0, '', '11110.00', 0, '', '', 84, 'undefined', '', 'undefined', 'Canada', ''),
(56, 'Expenses&Loans&Mortgage', 'Test2', '', 'mksnitc@gmail.com', 'Test1', '', '987-654-3210', '', '', 0, '', '0.00', 0, '', '', 84, 'undefined', '', 'undefined', 'Canada', ''),
(63, 'Expenses&Loans', 'Mksingh - Escrow', '', 'mksnitc@gmail.com', 'ABC Loan', '', '987-654-3210', '', '', 1, 'ABC', '111110.00', 0, 'Monthly', '18', 84, '', '', '', 'Canada', ''),
(64, 'Expenses&Loans', 'rtretretret - Escrow', '', 'fdgfdgdf@gmail.com', 'Test', '', '768-686-7876', '', '', 0, '', '11110.00', 0, '', '', 84, 'undefined', '', 'undefined', 'Canada', ''),
(65, 'Expenses&Loans&Mortgage', 'Loan Check Contact', '', 'mksnitc1@gmailcom', 'Loan Check1', '', '987-654-3210', '', '', 0, '', '0.00', 0, '', '', 85, '', '', '', 'USA', ''),
(66, 'Expenses&Loans&Mortgage', 'ABC Company-COntact', '', 'mksnitc@gmail.com', 'ABC Company', '', '987-654-3210', '', '', 0, 'Receipt', '10000.00', 0, 'Monthly', '2', 85, '', '', '', 'USA', ''),
(69, 'Expenses&Loans&Mortgage', 'ABC Company - 1475872105 - Escrow', '', 'mksnitc1@gmailcom', 'Loan Check1', '', '987-654-3210', '', '', 0, '', '110.00', 0, '', '', 85, '', '', '', 'USA', ''),
(70, 'Expenses&Insurance', 'Loan Check Contact - 1475872105 - Escrow', '', 'mksnitc1@gmailcom', 'Loan Check1', '', '987-654-3210', '', '', 0, '', '100.00', 0, '', '', 85, '', '', '', 'USA', ''),
(71, 'Expenses&Property-tax', 'Property Tax Contact', '', 'mkssprop@gmail.com', 'Property Tax Compnay', '', '987-654-3210', '', '', 0, '', '0.00', 0, '', '', 85, '', '', '', 'USA', ''),
(72, 'Expenses&Warranty', 'Warranty Provider Contact', '', 'Mksnitc@gmail.com', 'Warranty Provider', '', '987-654-3210', 'http://localhost:3000/contact-form', '', 0, '', '0.00', 0, '', '', 85, '', '', '', 'USA', ''),
(73, 'Expenses&Warranty', 'Warranty Provider1 Contact', '988-776-5555', 'mksnitc@gmail.com', 'Warranty Provider1', '', '436-578-4678', '', '', 0, '', '0.00', 0, '', '', 85, 'undefined', '', 'undefined', 'USA', '');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE IF NOT EXISTS `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `category` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `docname` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_danish_ci DEFAULT NULL,
  `attachment` varchar(255) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_document_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `date`, `category`, `docname`, `description`, `attachment`, `house_id`) VALUES
(6, '2021-06-13', 'Home Documents', 'resume', 'Test123', 'publicfiles1623592084376-MyHomeInfo.csv', 85);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attachment` varchar(255) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_galary_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `attachment`, `house_id`) VALUES
(4, '../files/1623745694111-dummyhome.jpg', 84);

-- --------------------------------------------------------

--
-- Table structure for table `hmodetails`
--

DROP TABLE IF EXISTS `hmodetails`;
CREATE TABLE IF NOT EXISTS `hmodetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hmodetails_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `hmodetails`
--

INSERT INTO `hmodetails` (`id`, `name`, `description`, `house_id`) VALUES
(40, 'ABC', 'MNC', 84),
(56, 'fdsfsdf', 'sdfsdf', 85),
(57, 'ewrwe', 'rwerwer', 84);

-- --------------------------------------------------------

--
-- Table structure for table `hoadetails`
--

DROP TABLE IF EXISTS `hoadetails`;
CREATE TABLE IF NOT EXISTS `hoadetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contactname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phoneno` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `frequency` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `amount` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hoadetails_house1_idx1` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `hoadetails`
--

INSERT INTO `hoadetails` (`id`, `companyname`, `contactname`, `phoneno`, `email`, `frequency`, `amount`, `house_id`) VALUES
(39, 'Exp Realty', 'Steve Angelil', '999-888-77', 'tbd@exprealty.com', '', '', 84),
(40, '', '', '', '', '', '', 85);

-- --------------------------------------------------------

--
-- Table structure for table `house`
--

DROP TABLE IF EXISTS `house`;
CREATE TABLE IF NOT EXISTS `house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `houseno` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `streetname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `state` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `country` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `zip` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `primaryHouse` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `yearbuilt` char(4) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `surveyno` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `purchaseamount` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `purchasedate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `buildername` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `subdivision` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `img_path` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `currency` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `house`
--

INSERT INTO `house` (`id`, `houseno`, `streetname`, `city`, `state`, `country`, `zip`, `primaryHouse`, `yearbuilt`, `surveyno`, `purchaseamount`, `purchasedate`, `buildername`, `subdivision`, `img_path`, `currency`) VALUES
(84, '17992', '17992 - Miramar', 'Miramar', 'Florida', 'Canada', '33029', 'Yes', '2008', '', '315,000.00', '2011-01-01', '', '', 'publicfiles1624024214014-dummyhome.jpg', ''),
(85, '4746', 'Grassendale Terrace', 'Sanford', 'Florida', 'USA', '32771', 'Yes', '2014', '', '359,900.00', '2021-04-19', 'KB Homes', 'Silverleaf', 'publicfiles1622391011497-4746 Home.jpg', '');

-- --------------------------------------------------------

--
-- Table structure for table `insurances`
--

DROP TABLE IF EXISTS `insurances`;
CREATE TABLE IF NOT EXISTS `insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(250) NOT NULL,
  `insurance_number` varchar(100) NOT NULL,
  `effective_date` varchar(50) NOT NULL,
  `expiry_date` varchar(50) NOT NULL,
  `premium` varchar(20) DEFAULT NULL,
  `provider_url` varchar(250) DEFAULT NULL,
  `renewed` varchar(20) DEFAULT NULL,
  `attachments` varchar(500) DEFAULT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `agent_name` varchar(250) DEFAULT NULL,
  `company_address` varchar(250) DEFAULT NULL,
  `company_phone` varchar(20) DEFAULT NULL,
  `company_email` varchar(100) DEFAULT NULL,
  `reminder_date` varchar(50) DEFAULT NULL,
  `reminder_phone` varchar(20) DEFAULT NULL,
  `reminder_email` varchar(100) DEFAULT NULL,
  `reminder_alternate_email` varchar(100) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'Active',
  `house_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_insurances_house` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `insurances`
--

INSERT INTO `insurances` (`id`, `provider`, `insurance_number`, `effective_date`, `expiry_date`, `premium`, `provider_url`, `renewed`, `attachments`, `company_name`, `agent_name`, `company_address`, `company_phone`, `company_email`, `reminder_date`, `reminder_phone`, `reminder_email`, `reminder_alternate_email`, `comments`, `status`, `house_id`, `created_at`) VALUES
(5, 'Fed Nat', '12345678', '2020-01-01', '2020-12-31', '2,500.00', '', 'Personal Loan', '', '', 'Kriste', '', '999-888-777', 'kriste@fednat.com', '', '', '', '', '', 'Active', 84, '2021-06-02 07:52:23'),
(6, 'AAA Insurance', '12333', '2021-06-15', '2021-06-18', '7', '', 'Mortgage', '', 'Test', '', '', '', '', '2021-06-15', 'Test1', '', '', '', 'Active', 85, '2021-06-15 07:00:14'),
(7, 'Fed Nat', '435345', '2021-06-20', '2021-06-20', '', '', 'Mortgage', '', 'Fed Nat', 'Kriste', '', '999-888-777', 'kriste@fednat.com', '2021-06-20', '', '', '', '', 'Active', 84, '2021-06-20 15:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `lease`
--

DROP TABLE IF EXISTS `lease`;
CREATE TABLE IF NOT EXISTS `lease` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lease_begin` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `lease_end` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `frequency` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `rent` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `rent_due_by` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `rental_insurance` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `tenant_name1` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `document` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `tenant_email1` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `tenant_phone1` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `tenant_name2` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `tenant_email2` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `tenant_phone2` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `people` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `pets` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `deposit` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `renewed` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `realtor_name` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `realtor_phone` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `realtor_email` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `hmo_space` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `space_description` varchar(255) COLLATE utf8_danish_ci DEFAULT NULL,
  `comment` varchar(200) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lease_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `lease`
--

INSERT INTO `lease` (`id`, `lease_begin`, `lease_end`, `frequency`, `rent`, `rent_due_by`, `rental_insurance`, `tenant_name1`, `document`, `tenant_email1`, `tenant_phone1`, `tenant_name2`, `tenant_email2`, `tenant_phone2`, `people`, `pets`, `deposit`, `renewed`, `realtor_name`, `realtor_phone`, `realtor_email`, `hmo_space`, `space_description`, `comment`, `house_id`) VALUES
(2, '2021-01-01', '2021-12-31', 'Monthly', '3100.00', '1st Of Every Month', 'No', 'Harshith', '', '', '', '', '', '', '5', '0', '3100.00', 'No', 'Exp Realty', '888-777-6666', 'tbd@steve.com', '', '', '', 87),
(3, '2021-06-10', '2021-06-18', 'Yearly', '88888', '', 'Yes', 'Manohar', '', 'mksnitc@gmail.com', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 85),
(4, '', '', '', '', '', '', 'XYZ', '', 'XYZ Contact', '9876543210', 'XYZ', 'XYZ Contact', '9876543210', '', '', '', '', '', '', '', '', '', '', 85),
(5, '', '', '', '', '', '', 'XYZ', '', 'XYZ Contact', '9876543210', 'XYZ', 'XYZ Contact', '9876543210', '', '', '', '', '', '', '', '', '', '', 84),
(6, '2021-06-21', '2021-06-22', 'Monthly', '11111', '', 'Yes', 'XYZ', '', 'XYZ Contact', '222-222-2222', 'ABC', 'Manohar', '333-333-3333', '', '', '', '', '', '', '', 'fdsfsdf', 'sdfsdf', '', 85),
(7, '2021-06-20', '2021-06-20', 'Monthly', '8', '', 'Yes', 'MyHomeInfo', '', 'Manohar', '9876543210', 'XYZ', 'XYZ Contact', '9876543210', '', '', '', '', 'Exp Realty', '999-888-7777', 'tbd@exprealty.com', 'ABC', 'MNC', '', 84);

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

DROP TABLE IF EXISTS `link`;
CREATE TABLE IF NOT EXISTS `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_danish_ci DEFAULT NULL,
  `urlname` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `date` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_link_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
CREATE TABLE IF NOT EXISTS `loan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loantype` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lcontactperson` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `laddress` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lphno` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lemail` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lurl` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `purchaseprice` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `downpayment` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `loanamount` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `rateofinterest` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `loanterm` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `loannumber` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `escrow` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mortgage` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `loanbegindate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `propertytax` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `doc_path` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `additionaldetails` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `loanclosuredate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `escrowPayee` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `propertytaxPayee` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `escrowamount` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  `lcontact_id` int(11) DEFAULT NULL,
  `escrowcontact_id` int(11) DEFAULT NULL,
  `propertytaxcontact_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_loan_house1_idx1` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `loan`
--

INSERT INTO `loan` (`id`, `loantype`, `lname`, `lcontactperson`, `laddress`, `lphno`, `lemail`, `lurl`, `purchaseprice`, `downpayment`, `loanamount`, `rateofinterest`, `loanterm`, `loannumber`, `escrow`, `mortgage`, `loanbegindate`, `propertytax`, `doc_path`, `additionaldetails`, `loanclosuredate`, `status`, `escrowPayee`, `propertytaxPayee`, `escrowamount`, `house_id`, `lcontact_id`, `escrowcontact_id`, `propertytaxcontact_id`) VALUES
(15, 'Mortgage', '65', 'Loan Check Contact', '', '987-654-3210', 'mksnitc1@gmailcom', '', '359,900.00', '17,995.00', '341,905', '3.25', '20', '1475872105', 'Yes', '1500', '2019-05-02', '2,400.00', '', '', '2022-04-15', 'Active', 'Loan Check Contact - 1475872105 - Escrow', 'Seminole County', '300.00', 85, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loantransaction`
--

DROP TABLE IF EXISTS `loantransaction`;
CREATE TABLE IF NOT EXISTS `loantransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pmtno` int(11) DEFAULT NULL,
  `paymentdate` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `beginingamount` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `scheduledpayment` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `extrapayment` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `totalpayment` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `principal` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `interest` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `endingbalance` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `cumulativeinterest` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `loan_id` int(11) DEFAULT NULL,
  `account_name` varchar(100) COLLATE utf8_danish_ci DEFAULT NULL,
  `comment` varchar(100) COLLATE utf8_danish_ci DEFAULT NULL,
  `entered_by` varchar(100) COLLATE utf8_danish_ci DEFAULT NULL,
  `contacts_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6976 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `loantransaction`
--

INSERT INTO `loantransaction` (`id`, `pmtno`, `paymentdate`, `beginingamount`, `scheduledpayment`, `extrapayment`, `totalpayment`, `principal`, `interest`, `endingbalance`, `cumulativeinterest`, `loan_id`, `account_name`, `comment`, `entered_by`, `contacts_id`) VALUES
(6969, 1, '7 Mar 2021', '1,500.00', '', '', '100.00', '', '', '1,600.00', '', 15, 'Loan Check Contact - 1475872105 - Escrow', '', 'Gangadhar Chittlur', 70),
(6970, 2, '7 Apr 2021', '1,600.00', '', '', '100.00', '', '', '1,700.00', '', 15, 'Loan Check Contact - 1475872105 - Escrow', '', 'Gangadhar Chittlur', 70),
(6971, 3, '7 May 2021', '1,700.00', '', '', '100.00', '', '', '1,800.00', '', 15, 'Loan Check Contact - 1475872105 - Escrow', '', 'Gangadhar Chittlur', 70),
(6972, 4, '7 Jun 2021', '1,800.00', '', '', '100.00', '', '', '1,900.00', '', 15, 'Loan Check Contact - 1475872105 - Escrow', '', 'Gangadhar Chittlur', 70),
(6973, 5, '7 Jul 2021', '1,900.00', '', '', '100.00', '', '', '2,000.00', '', 15, 'Loan Check Contact - 1475872105 - Escrow', '', 'Gangadhar Chittlur', 70),
(6974, 0, '2 Jul 2021', '2000.00', '', '', '1,000.00', '', '', '1,000.00', '', 0, 'Fran', '', 'Gangadhar Chittlur', 70),
(6975, 0, '16 Aug 2021', '1000.00', '', '', '700.00', '', '', '300.00', '', 0, 'Loan Check Contact - 1475872105 - Escrow', '', 'Gangadhar Chittlur', 70);

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
CREATE TABLE IF NOT EXISTS `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `zipcode` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `refferedby` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `substartdate` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `subenddate` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`id`, `name`, `email`, `username`, `address`, `zipcode`, `refferedby`, `substartdate`, `subenddate`, `mono`, `password`) VALUES
(24, 'Manohar', 'mksnitc1@gmail.com', 'manohar', 'Grassendale Terrace', '32771', '', '', '', '9606514210', '111111'),
(25, 'Gangadhar Chittlur', 'mksnitc@gmail.com', 'chittlur', '17992 - Miramar, FL, USA', '33029', 'Product Owner', '2021-01-01', '2021-08-08', '6475253049', '111111'),
(29, 'rey', 'mksnitc444@gmail.com', 'yssa', '', '', '', '', '', '9797979797', '222222'),
(30, 'etertert', 'mksnitc4@gmail.com', 'gfhfghfghfg', '', '', '', '', '', '435345345', '222222');

-- --------------------------------------------------------

--
-- Table structure for table `realtor`
--

DROP TABLE IF EXISTS `realtor`;
CREATE TABLE IF NOT EXISTS `realtor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `img_path` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_realtor_house1_idx1` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `realtor`
--

INSERT INTO `realtor` (`id`, `name`, `phono`, `email`, `details`, `img_path`, `house_id`) VALUES
(28, '', '', '', '', '', 84),
(29, '', '', '', '', '', 85);

-- --------------------------------------------------------

--
-- Table structure for table `reference`
--

DROP TABLE IF EXISTS `reference`;
CREATE TABLE IF NOT EXISTS `reference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `referred_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `registered_on` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reference_owner1_idx` (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
CREATE TABLE IF NOT EXISTS `reminder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_danish_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reminder_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`id`, `title`, `start`, `house_id`) VALUES
(1, 'Test', '2021-06-14 16:36:00', 85),
(2, 'Test1111', '2021-06-15 16:38:00', 85),
(3, 'Interview', '2021-06-16 16:41:00', 84),
(4, 'Standup Meeting', '2021-06-14 17:43:00', 85),
(5, 'Lunch', '2021-06-14 18:07:00', 85),
(6, 'ABC Meet', '2021-12-15 14:00:00', 85);

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
CREATE TABLE IF NOT EXISTS `share` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `lname` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `phono` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `accesslevel` varchar(45) COLLATE utf8_danish_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_share_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`id`, `fname`, `lname`, `phono`, `email`, `accesslevel`, `house_id`, `owner_id`) VALUES
(27, NULL, NULL, NULL, 'mksnitc@gmail.com', 'Full-Access', 84, 25),
(28, NULL, NULL, NULL, 'mksnitc@gmail.com', 'Full-Access', 85, 25),
(30, 'Manohra', 'singh', '987654321', 'mksnitc@gmail.com', 'Full-Access', 85, 0),
(31, 'Gangadhar', 'Chitloor', '987654321-', 'test123@gmail.com', 'Full-Access', 85, 0),
(32, 'Manohar', 'Singh', '960-651-4210', 'mksnitc@gmail.com', 'Full-Access', 84, 0),
(33, 'Manohar', 'Singh', '960-651-4210', 'mksnitc@gmail.com', 'Full-Access', 84, 0);

-- --------------------------------------------------------

--
-- Table structure for table `titleholders`
--

DROP TABLE IF EXISTS `titleholders`;
CREATE TABLE IF NOT EXISTS `titleholders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titleholder1` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `titleholder2` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `titleholder3` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `titleholder4` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_titleholders_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Dumping data for table `titleholders`
--

INSERT INTO `titleholders` (`id`, `titleholder1`, `titleholder2`, `titleholder3`, `titleholder4`, `house_id`) VALUES
(64, 'Gangadhar Chittlur', '', '', '', 84),
(65, 'Gangadhar Chittlur', '', '', '', 85);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(200) DEFAULT NULL,
  `contact_person` varchar(200) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `amount` varchar(50) DEFAULT NULL,
  `entered_by` varchar(200) DEFAULT NULL,
  `receipt` varchar(200) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `add_to_home_cost` tinyint(1) NOT NULL DEFAULT '0',
  `add_to_warranty` tinyint(1) NOT NULL DEFAULT '0',
  `debit` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_date` varchar(50) DEFAULT NULL,
  `deleted_by` varchar(100) DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `warranty_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transactions_house1_idx` (`house_id`),
  KEY `fk_transactions_warranty1_idx` (`warranty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `account_name`, `contact_person`, `type`, `date`, `amount`, `entered_by`, `receipt`, `comments`, `add_to_home_cost`, `add_to_warranty`, `debit`, `created_at`, `is_deleted`, `deleted_date`, `deleted_by`, `house_id`, `product_name`, `warranty_id`) VALUES
(50, '69', 'ABC Company - 1475872105 - Escrow', 'Payment', '2021-07-02', '', 'Gangadhar Chittlur', '', '', 0, 1, '', '2021-07-02 13:29:43', 0, NULL, NULL, 85, 'TV', 23),
(51, '42', 'Fran', 'Payment', '2021-07-02', '1000', 'Gangadhar Chittlur', '', '', 1, 1, '', '2021-07-02 13:32:42', 0, NULL, NULL, 85, 'Freedze Coller', 20),
(54, '69', 'ABC Company - 1475872105 - Escrow', 'Payment', '2021-07-02', '1000', 'Gangadhar Chittlur', '', '', 0, 0, '', '2021-07-02 14:05:03', 0, NULL, NULL, 85, NULL, NULL),
(55, '70', 'Loan Check Contact - 1475872105 - Escrow', 'Payment', '2021-08-16', '700', 'Gangadhar Chittlur', '', '', 0, 0, '', '2021-07-02 14:08:43', 0, NULL, NULL, 85, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `warranty`
--

DROP TABLE IF EXISTS `warranty`;
CREATE TABLE IF NOT EXISTS `warranty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `manufacturer_serial_no` varchar(100) DEFAULT NULL,
  `model_type` varchar(100) DEFAULT NULL,
  `model_no` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `product_price` varchar(50) DEFAULT NULL,
  `warranty_provider` varchar(250) NOT NULL DEFAULT 'NULL',
  `contact_person` varchar(250) NOT NULL DEFAULT 'NULL',
  `company_address` varchar(250) NOT NULL DEFAULT 'NULL',
  `phone_no` varchar(20) NOT NULL DEFAULT 'NULL',
  `email` varchar(250) NOT NULL DEFAULT 'NULL',
  `website_url` varchar(250) NOT NULL DEFAULT 'NULL',
  `mfg_warranty_start_date` varchar(20) DEFAULT NULL,
  `mfg_warranty_end_date` varchar(20) DEFAULT NULL,
  `extended_warranty_start_date` varchar(20) DEFAULT NULL,
  `extended_warranty_end_date` varchar(20) DEFAULT NULL,
  `installation_date` varchar(20) DEFAULT NULL,
  `installation_company_name` varchar(200) DEFAULT NULL,
  `installed_by` varchar(200) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `installation_charges` varchar(50) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_warranty_house1_idx` (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `warranty`
--

INSERT INTO `warranty` (`id`, `product_name`, `manufacturer_serial_no`, `model_type`, `model_no`, `color`, `product_price`, `warranty_provider`, `contact_person`, `company_address`, `phone_no`, `email`, `website_url`, `mfg_warranty_start_date`, `mfg_warranty_end_date`, `extended_warranty_start_date`, `extended_warranty_end_date`, `installation_date`, `installation_company_name`, `installed_by`, `contact_number`, `installation_charges`, `comments`, `image`, `created_at`, `house_id`) VALUES
(19, 'ABCD', NULL, NULL, NULL, NULL, NULL, 'Foutz', 'Robert Foutz', 'NULL', 'NULL', 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-07-02 09:59:25', 85),
(20, 'Freedze Coller', NULL, NULL, NULL, NULL, NULL, '42', 'Fran', 'NULL', 'NULL', 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-07-02 14:17:41', 85),
(21, 'AC', NULL, NULL, NULL, NULL, NULL, '69', 'ABC Company - 1475872105 - Escrow', 'NULL', 'NULL', 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-07-02 14:18:21', 85),
(22, 'AC', NULL, NULL, NULL, NULL, NULL, '69', 'ABC Company - 1475872105 - Escrow', 'NULL', 'NULL', 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-07-02 14:19:10', 85),
(23, 'TV', NULL, NULL, NULL, NULL, NULL, '69', 'ABC Company - 1475872105 - Escrow', 'NULL', 'NULL', 'NULL', 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-07-02 14:19:25', 85);

-- --------------------------------------------------------

--
-- Table structure for table `warrantydetails`
--

DROP TABLE IF EXISTS `warrantydetails`;
CREATE TABLE IF NOT EXISTS `warrantydetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `warranty-provider` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  `contact-person` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phono` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `url` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `manufstartdate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `enddate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `manuextstartdate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `extenddate` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_warrantydetails_house1_idx` (`house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_danish_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contactgroup`
--
ALTER TABLE `contactgroup`
  ADD CONSTRAINT `fk_contactgroup_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`);

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `fk_contacts_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `fk_document_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `fk_galary_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hmodetails`
--
ALTER TABLE `hmodetails`
  ADD CONSTRAINT `fk_hmodetails_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hoadetails`
--
ALTER TABLE `hoadetails`
  ADD CONSTRAINT `fk_hoadetails_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `insurances`
--
ALTER TABLE `insurances`
  ADD CONSTRAINT `fk_insurances_house` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lease`
--
ALTER TABLE `lease`
  ADD CONSTRAINT `fk_lease_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`);

--
-- Constraints for table `link`
--
ALTER TABLE `link`
  ADD CONSTRAINT `fk_link_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `fk_loan_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `realtor`
--
ALTER TABLE `realtor`
  ADD CONSTRAINT `fk_realtor_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reference`
--
ALTER TABLE `reference`
  ADD CONSTRAINT `fk_reference_owner1` FOREIGN KEY (`owner_id`) REFERENCES `owner` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reminder`
--
ALTER TABLE `reminder`
  ADD CONSTRAINT `fk_reminder_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`);

--
-- Constraints for table `share`
--
ALTER TABLE `share`
  ADD CONSTRAINT `fk_share_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `titleholders`
--
ALTER TABLE `titleholders`
  ADD CONSTRAINT `fk_titleholders_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_transactions_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transactions_warranty1` FOREIGN KEY (`warranty_id`) REFERENCES `warranty` (`id`);

--
-- Constraints for table `warranty`
--
ALTER TABLE `warranty`
  ADD CONSTRAINT `fk_warranty_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `warrantydetails`
--
ALTER TABLE `warrantydetails`
  ADD CONSTRAINT `fk_warrantydetails_house1` FOREIGN KEY (`house_id`) REFERENCES `house` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
