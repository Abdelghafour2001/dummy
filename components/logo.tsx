import Link from "next/link";

export function Logo({
  height = "32",
  width = "32",
}: {
  height?: string;
  width?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
    >
     <path d="M 1290 610.040 C 1227.152 616.083, 1168.882 648.467, 1115.551 706.992 C 1074.514 752.025, 1042.811 798.047, 968.746 920.100 C 904.215 1026.443, 866.672 1080.690, 818.634 1137 C 812.769 1143.875, 807.790 1150.400, 807.569 1151.500 C 802.159 1178.461, 794.978 1200.004, 784.236 1221.500 C 741.281 1307.459, 649.436 1372.769, 549.235 1388.607 C 543.331 1389.540, 538.137 1390.621, 537.693 1391.008 C 536.554 1392.004, 545.822 1400.091, 555.394 1406.451 C 587.623 1427.868, 634.545 1440.784, 699.251 1446.051 C 718.933 1447.653, 789.915 1446.748, 815 1444.575 C 895.836 1437.573, 971.153 1421.860, 1040.174 1397.597 C 1089.195 1380.365, 1140.375 1355.015, 1175.288 1330.673 C 1187.520 1322.145, 1207.585 1306.023, 1217 1297.157 L 1224.500 1290.095 1220 1290.032 C 1198.095 1289.726, 1170.454 1286.407, 1152.034 1281.872 C 1083.991 1265.117, 1032.507 1224.206, 1003.541 1163.875 C 991.401 1138.591, 984.047 1111.671, 980.489 1079.500 L 979.826 1073.500 983.661 1078 C 1032.215 1134.964, 1088.030 1169.992, 1151.539 1183.353 C 1194.550 1192.402, 1240.020 1192.747, 1285 1184.366 C 1332.200 1175.571, 1374.236 1158.310, 1415.055 1130.963 C 1497.260 1075.889, 1553.911 984.419, 1567.435 884.928 C 1569.513 869.640, 1571.050 844.970, 1570.044 843.046 C 1569.599 842.196, 1568.689 838.125, 1568.022 834 C 1553.057 741.435, 1519.693 681.831, 1462.500 645.492 C 1436.425 628.925, 1396.305 615.996, 1356.962 611.482 C 1340.569 609.601, 1302.983 608.792, 1290 610.040" stroke="none" fill="#13abdb" fill-rule="evenodd"/><path d="M 829.608 11.926 C 811.182 32.417, 781.116 59.065, 750 82.484 C 703.140 117.752, 652.486 150.514, 523 229.300 C 440.398 279.560, 390.213 311.911, 338 348.557 C 141.650 486.368, 38.618 620.004, 8.533 775.886 C -0.964 825.095, -2.154 878.452, 5.107 929.500 C 25.541 1073.159, 115.535 1202.613, 243.457 1272.358 C 287.147 1296.179, 337.896 1312.245, 394.500 1320.176 C 408.532 1322.142, 414.805 1322.422, 445.500 1322.456 C 473.469 1322.487, 483.411 1322.131, 494.990 1320.683 C 570.169 1311.283, 642.001 1284.070, 704.357 1241.364 C 737.352 1218.767, 779.475 1182.206, 801.715 1156.862 C 859.767 1090.705, 898.755 1035.441, 968.746 920.100 C 1021.034 833.933, 1047.559 792.974, 1074.216 757.236 C 1132.222 679.469, 1187.118 635.688, 1248.789 618.009 C 1280.225 608.997, 1315.699 606.867, 1356.962 611.512 C 1396.036 615.910, 1436.391 628.903, 1462.500 645.492 C 1515.745 679.323, 1547.867 732.372, 1563.927 813 C 1566.064 823.725, 1568.364 834.975, 1569.039 838 C 1569.714 841.025, 1570.592 848.675, 1570.991 855 L 1571.717 866.500 1571.432 853 C 1570.823 824.059, 1568.053 783.772, 1564.936 758.500 C 1536.072 524.509, 1390.232 317.322, 1137.757 151.631 C 1063.826 103.112, 986.580 61.927, 895.500 22.468 C 866.440 9.878, 842.579 0, 841.226 0 C 840.734 0, 835.506 5.367, 829.608 11.926 M 0.385 856 C 0.385 862.875, 0.545 865.688, 0.740 862.250 C 0.936 858.813, 0.936 853.188, 0.740 849.750 C 0.545 846.313, 0.385 849.125, 0.385 856" stroke="none" fill="#0474ac" fill-rule="evenodd"/>
    </svg>
  );
}

export function NamedLogoWithLink() {
  return (
    <Link href="/" className="flex flex-row items-center gap-3">
      <Logo height="24" width="24" />
      <h3 className="font-semibold text-lg">Capgemini Engineering Assistant</h3>
    </Link>
  );
}
