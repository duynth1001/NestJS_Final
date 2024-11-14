/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatVe` (
  `dat_ve_id` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` int DEFAULT NULL,
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_ghe` int DEFAULT NULL,
  PRIMARY KEY (`dat_ve_id`),
  KEY `tai_khoan` (`tai_khoan`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung` (`tai_khoan`) ON DELETE CASCADE,
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` varchar(255) DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `loai_nguoi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ngay_khoi_chieu` datetime DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(1, 1, 'banner_inception.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(2, 2, 'banner_matrix.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3, 3, 'banner_parasite.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(4, 4, 'banner_endgame.jpg'),
(5, 5, 'banner_interstellar.jpg'),
(6, 6, 'banner_dune.jpg'),
(7, 7, 'banner_spiderman.jpg'),
(8, 8, 'banner_thebatman.jpg'),
(9, 9, 'banner_avatar2.jpg'),
(10, 10, 'banner_oppenheimer.jpg');

INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'CGV Vincom Center', '72 Le Thanh Ton, District 1, Ho Chi Minh City', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'CGV Aeon Mall', '30 Bo Bao Tan Thang, Tan Phu District, Ho Chi Minh City', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'Galaxy Nguyen Du', '116 Nguyen Du, District 1, Ho Chi Minh City', 2);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'Galaxy Kinh Duong Vuong', '718bis Kinh Duong Vuong, Binh Tan District, Ho Chi Minh City', 2),
(5, 'Lotte Cinema Cantavil', '1 Song Hanh, District 2, Ho Chi Minh City', 3),
(6, 'Lotte Cinema Diamond', '34 Le Duan, District 1, Ho Chi Minh City', 3),
(7, 'BHD Star Bitexco', '2 Hai Trieu, District 1, Ho Chi Minh City', 4),
(8, 'BHD Star Vincom Thao Dien', '159 Xa Lo Ha Noi, District 2, Ho Chi Minh City', 4),
(9, 'Cinestar Hai Ba Trung', '135 Hai Ba Trung, District 1, Ho Chi Minh City', 5),
(10, 'Cinestar Quoc Thanh', '271 Nguyen Trai, District 1, Ho Chi Minh City', 5);

INSERT INTO `DatVe` (`dat_ve_id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 1, 3, 2);
INSERT INTO `DatVe` (`dat_ve_id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(2, 2, 1, 3);
INSERT INTO `DatVe` (`dat_ve_id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(3, 3, 2, 1);
INSERT INTO `DatVe` (`dat_ve_id`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(4, 4, 5, 4),
(5, 5, 4, 5),
(6, 1, 5, 1),
(7, 2, 4, 2),
(8, 3, 1, 5),
(9, 4, 3, 3),
(10, 5, 2, 4);

INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'A1', 'Standard', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(2, 'A2', 'Standard', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(3, 'A3', 'Standard', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(4, 'B1', 'VIP', 2),
(5, 'B2', 'VIP', 2),
(6, 'C1', 'Standard', 3),
(7, 'C2', 'Standard', 3),
(8, 'D1', 'VIP', 4),
(9, 'D2', 'VIP', 4),
(10, 'E1', 'Standard', 5);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'CGV Cinemas', 'cgv_logo.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'Galaxy Cinema', 'galaxy_logo.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'Lotte Cinema', 'lotte_logo.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'BHD Star Cineplex', 'bhd_logo.jpg'),
(5, 'Cinestar', 'cinestar_logo.jpg'),
(6, 'MegaGS', 'megags_logo.jpg'),
(7, 'Beta Cinemas', 'beta_logo.jpg'),
(8, 'Dcine', 'dcine_logo.jpg'),
(9, 'Cineplex', 'cineplex_logo.jpg'),
(10, 'Platinum Cineplex', 'platinum_logo.jpg');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2024-11-10 14:30:00', 90000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 1, 2, '2024-11-10 17:00:00', 90000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 2, 1, '2024-11-11 14:30:00', 100000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 2, 3, '2024-11-11 19:30:00', 100000),
(5, 3, 2, '2024-11-12 15:00:00', 95000),
(6, 3, 4, '2024-11-12 20:00:00', 95000),
(7, 4, 1, '2024-11-13 13:00:00', 85000),
(8, 4, 5, '2024-11-13 18:30:00', 85000),
(9, 5, 3, '2024-11-14 16:00:00', 90000),
(10, 5, 4, '2024-11-14 21:00:00', 90000),
(11, 2, 3, '2024-11-14 21:00:00', 1222),
(12, 1, 3, '2024-11-14 21:00:00', 222000),
(20, 1, 3, '2024-11-13 22:30:23', 222000);

INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'Nguyen Van A', 'nguyenvana@example.com', '0901234567', 'password123', 'KhachHang');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'Le Thi B', 'lethib@example.com', '0902345678', 'password123', 'KhachHang');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(3, 'Tran Van C', 'tranvanc@example.com', '0903456789', 'password123', 'KhachHang');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'Pham Thi D', 'phamthid@example.com', '0904567890', 'password123', 'KhachHang'),
(5, 'Nguyen Van E', 'nguyenvane@example.com', '0905678901', 'password123', 'KhachHang'),
(6, 'Le Van F', 'levanf@example.com', '0906789012', 'password123', 'KhachHang'),
(7, 'Tran Thi G', 'tranthig@example.com', '0907890123', 'password123', 'QuanTri'),
(8, 'Nguyen Van H', 'nguyenvanh@example.com', '0908901234', 'password123', 'QuanTri'),
(9, 'Pham Van I', 'phamvani@example.com', '0909012345', 'password123', 'QuanTri'),
(10, 'Bui Thi J', 'buithij@example.com', '0910123456', 'password123', 'KhachHang');

INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'Inception', 'https://youtube.com/trailer/inception', 'inception.jpg', 'A thief with the ability to enter dreams is tasked with planting an idea in someone\'s mind.', '2010-07-16 00:00:00', 9, 1, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'The Matrix', 'https://youtube.com/trailer/thematrix', 'matrix.jpg', 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', '1999-03-31 00:00:00', 8, 1, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'Parasite', 'https://youtube.com/trailer/parasite', 'parasite.jpg', 'A poor family schemes to become employed by a wealthy family by infiltrating their household.', '2019-05-30 00:00:00', 9, 1, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'Avengers: Endgame', 'https://youtube.com/trailer/avengers_endgame', 'endgame.jpg', 'The Avengers assemble once more to reverse the destruction caused by Thanos.', '2019-04-26 00:00:00', 8, 1, 0, 0),
(5, 'Interstellar', 'https://youtube.com/trailer/interstellar', 'interstellar.jpg', 'A team of explorers travels through a wormhole in search of a new habitable planet.', '2014-11-07 00:00:00', 9, 1, 0, 0),
(6, 'Dune', 'https://youtube.com/trailer/dune', 'dune.jpg', 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset.', '2021-10-22 00:00:00', 8, 1, 0, 0),
(7, 'Spider-Man: No Way Home', 'https://youtube.com/trailer/spiderman_nwh', 'spiderman.jpg', 'Spider-Man seeks Doctor Strange\'s help to restore his secret identity, leading to multiverse chaos.', '2021-12-17 00:00:00', 9, 1, 1, 0),
(8, 'The Batman', 'https://youtube.com/trailer/thebatman', 'thebatman.jpg', 'Batman ventures into Gotham\'s underworld to unmask the Riddler, a sadistic killer.', '2022-03-04 00:00:00', 8, 0, 1, 0),
(9, 'Avatar: The Way of Water', 'https://youtube.com/trailer/avatar2', 'avatar2.jpg', 'Jake Sully and Neytiri navigate life with their new family on Pandora.', '2022-12-16 00:00:00', 8, 1, 1, 0),
(10, 'Oppenheimer', 'https://youtube.com/trailer/oppenheimer', 'oppenheimer.jpg', 'The story of J. Robert Oppenheimer and the creation of the atomic bomb.', '2023-07-21 00:00:00', 9, 1, 1, 1);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'Rap 1 - Vincom Center', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'Rap 2 - Vincom Center', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'Rap 1 - Aeon Mall', 2);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'Rap 2 - Aeon Mall', 2),
(5, 'Rap 1 - Galaxy Nguyen Du', 3),
(6, 'Rap 2 - Galaxy Nguyen Du', 3),
(7, 'Rap 1 - Galaxy Kinh Duong Vuong', 4),
(8, 'Rap 2 - Galaxy Kinh Duong Vuong', 4),
(9, 'Rap 1 - Lotte Cantavil', 5),
(10, 'Rap 2 - Lotte Cantavil', 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;