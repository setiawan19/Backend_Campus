-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2019 at 09:21 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kampus`
--

-- --------------------------------------------------------

--
-- Table structure for table `fakultas`
--

CREATE TABLE `fakultas` (
  `id` int(10) NOT NULL,
  `nama` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fakultas`
--

INSERT INTO `fakultas` (`id`, `nama`) VALUES
(1, 'teknik'),
(2, 'ekonomi'),
(3, 'sastra dan budaya'),
(4, 'keilmuan psikologi');

-- --------------------------------------------------------

--
-- Table structure for table `ipk`
--

CREATE TABLE `ipk` (
  `id` int(10) NOT NULL,
  `id_sks` int(10) NOT NULL,
  `ipk` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nim` int(20) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `tempat_lahir` varchar(20) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `asal_sekolah` varchar(30) NOT NULL,
  `nilai_UN` float NOT NULL,
  `tahun_lulus` int(5) NOT NULL,
  `tahun_masuk_kuliah` int(5) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `pekerjaan_orangtua` varchar(30) NOT NULL,
  `jurusan_sekolah` varchar(30) NOT NULL,
  `id_prodi` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`nim`, `nama`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `asal_sekolah`, `nilai_UN`, `tahun_lulus`, `tahun_masuk_kuliah`, `no_hp`, `email`, `pekerjaan_orangtua`, `jurusan_sekolah`, `id_prodi`) VALUES
(20191010, 'Sutopo', 'laki-laki', 'Jakarta', '1993-01-01', 'SMA 48 Jakarta', 3.8, 2011, 2011, '082137605588', 'sutopo@gmail.com', 'PNS', 'IPA', 2),
(20191011, 'putri handayani', 'perempuan', 'bandung', '1995-06-12', 'SMA N 1 Bandung', 3.82, 2013, 2013, '082111225544', 'putri@gmail.com', 'wirausaha', 'IPA', 3);

-- --------------------------------------------------------

--
-- Table structure for table `prodi`
--

CREATE TABLE `prodi` (
  `id` int(10) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `total_sks` int(10) NOT NULL,
  `id_fk` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prodi`
--

INSERT INTO `prodi` (`id`, `nama`, `total_sks`, `id_fk`) VALUES
(1, 'informatika', 144, 1),
(2, 'industri', 140, 1),
(3, 'ekonomi', 130, 2),
(4, 'management', 135, 2),
(5, 'psikologi', 150, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sks`
--

CREATE TABLE `sks` (
  `id` int(10) NOT NULL,
  `nim` int(11) NOT NULL,
  `sks_lulus` int(2) DEFAULT NULL,
  `ips` float DEFAULT NULL,
  `ipk` float DEFAULT NULL,
  `semester` int(2) DEFAULT NULL,
  `tahun` int(4) DEFAULT NULL,
  `sisa_sks` int(3) DEFAULT NULL,
  `target_wisuda` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sks`
--

INSERT INTO `sks` (`id`, `nim`, `sks_lulus`, `ips`, `ipk`, `semester`, `tahun`, `sisa_sks`, `target_wisuda`) VALUES
(1, 20191010, 20, 3.04, 3.04, 1, 2019, 120, '3.5 tahun'),
(2, 20191011, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(2) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `alamat` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `alamat`, `phone`, `jenis_kelamin`, `email`, `password`) VALUES
(1, 'admin', 'Jl.Kayumanis Timur, Matraman', '0852314524466', 'perempuan', 'admin@gmail.com', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fakultas`
--
ALTER TABLE `fakultas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `ipk`
--
ALTER TABLE `ipk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nim`);

--
-- Indexes for table `prodi`
--
ALTER TABLE `prodi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sks`
--
ALTER TABLE `sks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fakultas`
--
ALTER TABLE `fakultas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prodi`
--
ALTER TABLE `prodi`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sks`
--
ALTER TABLE `sks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
