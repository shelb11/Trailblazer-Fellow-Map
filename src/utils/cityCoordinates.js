/**
 * Static city-to-coordinates lookup for US cities.
 * Keys: "City, ST" (e.g., "Austin, TX")
 * Values: [longitude, latitude] — react-simple-maps uses [lng, lat] order.
 */
export const CITY_COORDINATES = {
  // Alabama
  'Birmingham, AL': [-86.8025, 33.5207],
  'Montgomery, AL': [-86.3001, 32.3669],
  'Huntsville, AL': [-86.5861, 34.7304],
  'Mobile, AL': [-88.0399, 30.6954],
  'Tuscaloosa, AL': [-87.5692, 33.2098],
  'Center Point, AL': [-86.6836, 33.6454],
  'Phenix City, AL': [-85.0008, 32.4710],

  // Alaska
  'Anchorage, AK': [-149.9003, 61.2181],
  'Fairbanks, AK': [-147.7164, 64.8378],
  'Juneau, AK': [-134.4197, 58.3005],

  // Arizona
  'Phoenix, AZ': [-112.0740, 33.4484],
  'Tucson, AZ': [-110.9747, 32.2226],
  'Mesa, AZ': [-111.8315, 33.4152],
  'Chandler, AZ': [-111.8413, 33.3062],
  'Scottsdale, AZ': [-111.9261, 33.4942],
  'Gilbert, AZ': [-111.7890, 33.3528],
  'Glendale, AZ': [-112.1859, 33.5387],
  'Tempe, AZ': [-111.9400, 33.4255],
  'Peoria, AZ': [-112.2374, 33.5806],
  'Flagstaff, AZ': [-111.6513, 35.1983],
  'Maricopa, AZ': [-112.0476, 33.0581],
  'Sanders, AZ': [-109.3245, 35.2139],
  'Whiteriver, AZ': [-109.9648, 33.8370],

  // Arkansas
  'Little Rock, AR': [-92.2896, 34.7465],
  'Fort Smith, AR': [-94.3985, 35.3859],
  'Fayetteville, AR': [-94.1574, 36.0626],
  'Springdale, AR': [-94.1288, 36.1867],
  'Forrest City, AR': [-90.7898, 35.0084],

  // California
  'Los Angeles, CA': [-118.2437, 34.0522],
  'San Francisco, CA': [-122.4194, 37.7749],
  'San Diego, CA': [-117.1611, 32.7157],
  'San Jose, CA': [-121.8863, 37.3382],
  'Sacramento, CA': [-121.4944, 38.5816],
  'Fresno, CA': [-119.7871, 36.7378],
  'Long Beach, CA': [-118.1937, 33.7701],
  'Oakland, CA': [-122.2712, 37.8044],
  'Bakersfield, CA': [-119.0187, 35.3733],
  'Anaheim, CA': [-117.9145, 33.8366],
  'Santa Ana, CA': [-117.8677, 33.7455],
  'Riverside, CA': [-117.3962, 33.9534],
  'Stockton, CA': [-121.2908, 37.9577],
  'Irvine, CA': [-117.8265, 33.6846],
  'Chula Vista, CA': [-117.0842, 32.6401],
  'Santa Clara, CA': [-121.9552, 37.3541],
  'Fremont, CA': [-121.9886, 37.5485],
  'San Bernardino, CA': [-117.2898, 34.1083],
  'Modesto, CA': [-120.9969, 37.6391],
  'Pasadena, CA': [-118.1445, 34.1478],
  'Berkeley, CA': [-122.2727, 37.8716],
  'Sunnyvale, CA': [-122.0364, 37.3688],
  'Palo Alto, CA': [-122.1430, 37.4419],
  'Mountain View, CA': [-122.0838, 37.3861],
  'Redwood City, CA': [-122.2363, 37.4852],
  'Compton, CA': [-118.2201, 33.8959],
  'Inglewood, CA': [-118.3531, 33.9617],
  'Pomona, CA': [-117.7500, 34.0551],
  'Torrance, CA': [-118.3406, 33.8358],
  'Hayward, CA': [-122.0808, 37.6688],
  'Escondido, CA': [-117.0864, 33.1192],
  'Ventura, CA': [-119.2290, 34.2746],
  'Santa Barbara, CA': [-119.6982, 34.4208],
  'Santa Cruz, CA': [-122.0308, 36.9741],

  // Colorado
  'Denver, CO': [-104.9903, 39.7392],
  'Colorado Springs, CO': [-104.8214, 38.8339],
  'Aurora, CO': [-104.8319, 39.7294],
  'Fort Collins, CO': [-105.0844, 40.5853],
  'Lakewood, CO': [-105.0844, 39.7047],
  'Boulder, CO': [-105.2705, 40.0150],
  'Pueblo, CO': [-104.6091, 38.2545],
  'Canon City, CO': [-105.2422, 38.4411],
  'Evans, CO': [-104.6922, 40.3763],
  'Grand Junction, CO': [-108.5507, 39.0639],
  'Longmont, CO': [-105.1019, 40.1672],

  // Connecticut
  'Hartford, CT': [-72.6823, 41.7658],
  'Bridgeport, CT': [-73.1952, 41.1865],
  'New Haven, CT': [-72.9282, 41.3083],
  'Stamford, CT': [-73.5387, 41.0534],
  'Waterbury, CT': [-73.0515, 41.5582],
  'Norwalk, CT': [-73.4082, 41.1176],

  // Delaware
  'Wilmington, DE': [-75.5398, 39.7391],
  'Dover, DE': [-75.5244, 39.1582],
  'Newark, DE': [-75.7496, 39.6837],

  // Florida
  'Miami, FL': [-80.1918, 25.7617],
  'Orlando, FL': [-81.3789, 28.5384],
  'Tampa, FL': [-82.4572, 27.9506],
  'Jacksonville, FL': [-81.6557, 30.3322],
  'St. Petersburg, FL': [-82.6403, 27.7676],
  'Tallahassee, FL': [-84.2807, 30.4383],
  'Fort Lauderdale, FL': [-80.1373, 26.1224],
  'Hialeah, FL': [-80.2781, 25.8576],
  'Cape Coral, FL': [-81.9495, 26.5629],
  'Gainesville, FL': [-82.3248, 29.6516],
  'Clearwater, FL': [-82.8001, 27.9659],
  'Pembroke Pines, FL': [-80.2241, 26.0128],
  'Hollywood, FL': [-80.1495, 26.0112],
  'Coral Springs, FL': [-80.2706, 26.2712],
  'Pensacola, FL': [-87.2169, 30.4213],
  'Sarasota, FL': [-82.5308, 27.3364],
  'Lakeland, FL': [-81.9498, 28.0395],
  'Naples, FL': [-81.7948, 26.1420],
  'Dover, FL': [-82.2215, 27.9942],
  'Gibsonton, FL': [-82.3832, 27.8336],
  'Homestead, FL': [-80.4776, 25.4687],
  'Plant City, FL': [-82.1176, 28.0186],
  'Temple Terrace, FL': [-82.3893, 28.0353],

  // Georgia
  'Atlanta, GA': [-84.3880, 33.7490],
  'Augusta, GA': [-81.9651, 33.4735],
  'Columbus, GA': [-84.9877, 32.4610],
  'Savannah, GA': [-81.0998, 32.0809],
  'Athens, GA': [-83.3771, 33.9519],
  'Macon, GA': [-83.6324, 32.8407],
  'Roswell, GA': [-84.3613, 34.0232],
  'Marietta, GA': [-84.5500, 33.9526],
  'Decatur, GA': [-84.2963, 33.7748],
  'Buford, GA': [-84.0043, 34.1207],
  'Chamblee, GA': [-84.2988, 33.8879],
  'Covington, GA': [-83.8602, 33.5968],
  'Union City, GA': [-84.5424, 33.5871],

  // Hawaii
  'Honolulu, HI': [-157.8583, 21.3069],
  'Hilo, HI': [-155.0900, 19.7297],
  'Kailua, HI': [-157.7394, 21.4022],

  // Idaho
  'Boise, ID': [-116.2023, 43.6150],
  'Meridian, ID': [-116.3915, 43.6121],
  'Nampa, ID': [-116.5635, 43.5407],
  'Idaho Falls, ID': [-112.0341, 43.4917],
  'Montpelier, ID': [-111.2977, 42.3213],
  'Rathdrum, ID': [-116.8894, 47.8124],

  // Illinois
  'Chicago, IL': [-87.6298, 41.8781],
  'Aurora, IL': [-88.3201, 41.7606],
  'Rockford, IL': [-89.0940, 42.2711],
  'Joliet, IL': [-88.0817, 41.5250],
  'Naperville, IL': [-88.1535, 41.7508],
  'Springfield, IL': [-89.6501, 39.7817],
  'Peoria, IL': [-89.5890, 40.6936],
  'Elgin, IL': [-88.2826, 42.0354],
  'Champaign, IL': [-88.2434, 40.1164],
  'Evanston, IL': [-87.6876, 42.0451],
  'Lombard, IL': [-88.0079, 41.8800],

  // Indiana
  'Indianapolis, IN': [-86.1581, 39.7684],
  'Fort Wayne, IN': [-85.1394, 41.0793],
  'Evansville, IN': [-87.5711, 37.9716],
  'South Bend, IN': [-86.2520, 41.6764],
  'Carmel, IN': [-86.1180, 39.9784],
  'Bloomington, IN': [-86.5264, 39.1653],

  // Iowa
  'Des Moines, IA': [-93.6091, 41.5868],
  'Cedar Rapids, IA': [-91.6656, 41.9779],
  'Davenport, IA': [-90.5776, 41.5236],
  'Sioux City, IA': [-96.4003, 42.4999],
  'Iowa City, IA': [-91.5302, 41.6611],
  'Delhi, IA': [-91.3321, 42.4275],

  // Kansas
  'Wichita, KS': [-97.3301, 37.6872],
  'Overland Park, KS': [-94.6708, 38.9822],
  'Kansas City, KS': [-94.6275, 39.1141],
  'Topeka, KS': [-95.6890, 39.0473],
  'Olathe, KS': [-94.8191, 38.8814],
  'Lawrence, KS': [-95.2353, 38.9717],

  // Kentucky
  'Louisville, KY': [-85.7585, 38.2527],
  'Lexington, KY': [-84.5037, 38.0406],
  'Bowling Green, KY': [-86.4436, 36.9685],
  'Owensboro, KY': [-87.1112, 37.7719],
  'Covington, KY': [-84.5085, 39.0837],
  'Frankfort, KY': [-84.8733, 38.2009],
  'Ashland, KY': [-82.6379, 38.4784],
  'Corbin, KY': [-84.0966, 36.9487],
  'Flemingsburg, KY': [-83.7338, 38.4223],
  'Frenchburg, KY': [-83.6249, 37.9512],
  'Garrison, KY': [-83.1879, 38.5568],
  'Harlan, KY': [-83.3219, 36.8431],
  'Louisa, KY': [-82.6032, 38.1143],
  'Middlesboro, KY': [-83.7166, 36.6084],
  'Morehead, KY': [-83.4327, 38.1837],
  'Paintsville, KY': [-82.8071, 37.8145],
  'Richmond, KY': [-84.2947, 37.7479],
  'Wurtland, KY': [-82.7782, 38.5473],

  // Louisiana
  'New Orleans, LA': [-90.0715, 29.9511],
  'Baton Rouge, LA': [-91.1403, 30.4515],
  'Shreveport, LA': [-93.7502, 32.5252],
  'Lafayette, LA': [-92.0198, 30.2241],
  'Lake Charles, LA': [-93.2174, 30.2266],
  'Raceland, LA': [-90.5982, 29.7266],

  // Maine
  'Portland, ME': [-70.2553, 43.6591],
  'Lewiston, ME': [-70.2148, 44.1004],
  'Bangor, ME': [-68.7712, 44.8016],
  'Augusta, ME': [-69.7795, 44.3106],

  // Maryland
  'Baltimore, MD': [-76.6122, 39.2904],
  'Columbia, MD': [-76.8396, 39.2037],
  'Germantown, MD': [-77.2714, 39.1732],
  'Silver Spring, MD': [-77.0261, 38.9907],
  'Rockville, MD': [-77.1528, 39.0840],
  'Bethesda, MD': [-77.0947, 38.9847],
  'Frederick, MD': [-77.4105, 39.4143],
  'Annapolis, MD': [-76.4922, 38.9784],
  'Capitol Heights, MD': [-76.8958, 38.8851],

  // Massachusetts
  'Boston, MA': [-71.0589, 42.3601],
  'Worcester, MA': [-71.8023, 42.2626],
  'Springfield, MA': [-72.5898, 42.1015],
  'Cambridge, MA': [-71.1097, 42.3736],
  'Lowell, MA': [-71.3162, 42.6334],
  'Brockton, MA': [-71.0184, 42.0834],
  'New Bedford, MA': [-70.9342, 41.6362],
  'Somerville, MA': [-71.0995, 42.3876],

  // Michigan
  'Detroit, MI': [-83.0458, 42.3314],
  'Grand Rapids, MI': [-85.6681, 42.9634],
  'Warren, MI': [-83.0147, 42.5145],
  'Sterling Heights, MI': [-83.0302, 42.5803],
  'Ann Arbor, MI': [-83.7430, 42.2808],
  'Lansing, MI': [-84.5555, 42.7325],
  'Flint, MI': [-83.6875, 43.0125],
  'Dearborn, MI': [-83.1763, 42.3223],
  'Kalamazoo, MI': [-85.5872, 42.2917],
  'Battle Creek, MI': [-85.1797, 42.3212],
  'Sault Sainte Marie, MI': [-84.3458, 46.4953],

  // Minnesota
  'Minneapolis, MN': [-93.2650, 44.9778],
  'St. Paul, MN': [-93.0900, 44.9537],
  'Rochester, MN': [-92.4699, 44.0121],
  'Duluth, MN': [-92.1005, 46.7867],
  'Bloomington, MN': [-93.2983, 44.8408],
  'Brooklyn Park, MN': [-93.3563, 45.0941],
  'Plymouth, MN': [-93.4555, 45.0105],
  'Eden Prairie, MN': [-93.4708, 44.8547],
  'Mountain Iron, MN': [-92.6233, 47.5322],
  'Parkers Prairie, MN': [-95.3281, 46.1530],

  // Mississippi
  'Jackson, MS': [-90.1848, 32.2988],
  'Gulfport, MS': [-89.0928, 30.3674],
  'Hattiesburg, MS': [-89.2903, 31.3271],
  'Biloxi, MS': [-88.8853, 30.3960],
  'Meridian, MS': [-88.7037, 32.3643],
  'Camden, MS': [-89.9387, 32.9990],
  'Greenville, MS': [-91.0618, 33.4101],

  // Missouri
  'Kansas City, MO': [-94.5786, 39.0997],
  'St. Louis, MO': [-90.1994, 38.6270],
  'Springfield, MO': [-93.2923, 37.2090],
  'Columbia, MO': [-92.3341, 38.9517],
  'Independence, MO': [-94.4155, 39.0911],
  'Jefferson City, MO': [-92.1735, 38.5767],
  'Newtown, MO': [-91.8824, 36.8756],

  // Montana
  'Billings, MT': [-108.5007, 45.7833],
  'Missoula, MT': [-114.0103, 46.8721],
  'Great Falls, MT': [-111.2833, 47.5053],
  'Helena, MT': [-112.0391, 46.5884],
  'Bozeman, MT': [-111.0429, 45.6770],
  'Bigfork, MT': [-114.0726, 48.0636],
  'Choteau, MT': [-112.1802, 47.8122],
  'Crow Agency, MT': [-107.4611, 45.6019],
  'Florence, MT': [-114.0834, 46.6310],
  'Hardin, MT': [-107.6112, 45.7325],
  'Harlem, MT': [-108.7856, 48.5344],
  'Havre, MT': [-109.6684, 48.5500],
  'Heart Butte, MT': [-112.8419, 48.2864],
  'Miles City, MT': [-105.8406, 46.4083],
  'Polson, MT': [-114.1631, 47.6936],
  'Ronan, MT': [-114.1020, 47.5286],
  'Rosebud, MT': [-106.7734, 46.2636],
  'Somers, MT': [-114.2245, 48.0789],
  'St. Ignatius, MT': [-114.0975, 47.3175],

  // Nebraska
  'Omaha, NE': [-95.9345, 41.2565],
  'Lincoln, NE': [-96.7026, 40.8136],
  'Bellevue, NE': [-95.8908, 41.1544],
  'Grand Island, NE': [-98.3420, 40.9264],

  // Nevada
  'Las Vegas, NV': [-115.1398, 36.1699],
  'Henderson, NV': [-115.0352, 36.0395],
  'Reno, NV': [-119.8138, 39.5296],
  'North Las Vegas, NV': [-115.1175, 36.1989],
  'Sparks, NV': [-119.7527, 39.5349],
  'Carson City, NV': [-119.7674, 39.1638],

  // New Hampshire
  'Manchester, NH': [-71.4548, 42.9956],
  'Nashua, NH': [-71.4675, 42.7654],
  'Concord, NH': [-71.5376, 43.2081],
  'Lancaster, NH': [-71.5692, 44.4892],

  // New Jersey
  'Newark, NJ': [-74.1724, 40.7357],
  'Jersey City, NJ': [-74.0431, 40.7178],
  'Paterson, NJ': [-74.1718, 40.9168],
  'Elizabeth, NJ': [-74.2107, 40.6640],
  'Trenton, NJ': [-74.7429, 40.2206],
  'Camden, NJ': [-75.1196, 39.9260],
  'Princeton, NJ': [-74.6594, 40.3573],
  'Cherry Hill, NJ': [-74.9398, 39.9348],
  'Hoboken, NJ': [-74.0323, 40.7440],
  'Jackson, NJ': [-74.3635, 40.0987],
  'Wanaque, NJ': [-74.2904, 41.0382],

  // New Mexico
  'Albuquerque, NM': [-106.6504, 35.0844],
  'Las Cruces, NM': [-106.7460, 32.3199],
  'Santa Fe, NM': [-105.9378, 35.6870],
  'Rio Rancho, NM': [-106.6630, 35.2334],

  // New York
  'New York, NY': [-74.0060, 40.7128],
  'New York City, NY': [-74.0060, 40.7128],
  'Buffalo, NY': [-78.8784, 42.8864],
  'Rochester, NY': [-77.6109, 43.1566],
  'Yonkers, NY': [-73.8988, 40.9312],
  'Syracuse, NY': [-76.1474, 43.0481],
  'Albany, NY': [-73.7562, 42.6526],
  'New Rochelle, NY': [-73.7823, 40.9115],
  'Ithaca, NY': [-76.4966, 42.4440],
  'White Plains, NY': [-73.7629, 41.0340],
  'Brooklyn, NY': [-73.9442, 40.6782],
  'Bronx, NY': [-73.8648, 40.8448],
  'Queens, NY': [-73.7949, 40.7282],
  'Staten Island, NY': [-74.1502, 40.5795],
  'Garden City, NY': [-73.6343, 40.7268],
  'Jamaica, NY': [-73.7935, 40.7029],

  // North Carolina
  'Charlotte, NC': [-80.8431, 35.2271],
  'Raleigh, NC': [-78.6382, 35.7796],
  'Greensboro, NC': [-79.7910, 36.0726],
  'Durham, NC': [-78.8986, 35.9940],
  'Winston-Salem, NC': [-80.2442, 36.0999],
  'Fayetteville, NC': [-78.8784, 35.0527],
  'Cary, NC': [-78.7811, 35.7915],
  'Wilmington, NC': [-77.9447, 34.2257],
  'High Point, NC': [-79.9987, 35.9557],
  'Asheville, NC': [-82.5515, 35.5951],
  'Chapel Hill, NC': [-79.0559, 35.9132],
  'Huntersville, NC': [-80.8429, 35.4107],
  'Kernersville, NC': [-80.0737, 36.1199],
  'Lenoir, NC': [-81.5390, 35.9141],
  'Pisgah Forest, NC': [-82.6568, 35.2485],
  'West Jefferson, NC': [-81.4929, 36.4035],
  'Wilkesboro, NC': [-81.1601, 36.1460],
  'Hiddenite, NC': [-81.1068, 35.8727],
  'Hiddenite/Taylorsville, NC': [-81.1757, 35.9218],

  // North Dakota
  'Fargo, ND': [-96.7898, 46.8772],
  'Bismarck, ND': [-100.7837, 46.8083],
  'Grand Forks, ND': [-97.0329, 47.9253],

  // Ohio
  'Columbus, OH': [-82.9988, 39.9612],
  'Cleveland, OH': [-81.6944, 41.4993],
  'Cincinnati, OH': [-84.5120, 39.1031],
  'Toledo, OH': [-83.5379, 41.6528],
  'Akron, OH': [-81.5190, 41.0814],
  'Dayton, OH': [-84.1916, 39.7589],
  'Canton, OH': [-81.3784, 40.7990],
  'Youngstown, OH': [-80.6496, 41.0998],
  'Bucyrus, OH': [-82.9752, 40.8081],
  'Fairborn, OH': [-84.0194, 39.8209],
  'Liberty Center, OH': [-84.0069, 41.4439],

  // Oklahoma
  'Oklahoma City, OK': [-97.5164, 35.4676],
  'Tulsa, OK': [-95.9928, 36.1540],
  'Norman, OK': [-97.4395, 35.2226],
  'Broken Arrow, OK': [-95.7975, 36.0526],
  'Edmond, OK': [-97.4781, 35.6528],

  // Oregon
  'Portland, OR': [-122.6765, 45.5152],
  'Salem, OR': [-123.0351, 44.9429],
  'Eugene, OR': [-123.0868, 44.0521],
  'Gresham, OR': [-122.4310, 45.4983],
  'Hillsboro, OR': [-122.9898, 45.5229],
  'Bend, OR': [-121.3153, 44.0582],
  'Beaverton, OR': [-122.8031, 45.4871],
  'Medford, OR': [-122.8756, 42.3265],
  'Corvallis, OR': [-123.2620, 44.5646],
  'Hood River, OR': [-121.5220, 45.7054],

  // Pennsylvania
  'Philadelphia, PA': [-75.1652, 39.9526],
  'Pittsburgh, PA': [-79.9959, 40.4406],
  'Allentown, PA': [-75.4902, 40.6084],
  'Erie, PA': [-80.0852, 42.1292],
  'Reading, PA': [-75.9269, 40.3357],
  'Scranton, PA': [-75.6624, 41.4090],
  'Bethlehem, PA': [-75.3705, 40.6259],
  'Lancaster, PA': [-76.3055, 40.0379],
  'Harrisburg, PA': [-76.8867, 40.2732],
  'State College, PA': [-77.8600, 40.7934],
  'Ashland, PA': [-76.3455, 40.7815],
  'Greensburg, PA': [-79.5389, 40.3015],
  'Houston, PA': [-80.2115, 40.2453],
  'Manchester, PA': [-76.7183, 40.0634],
  'Williamsburg, PA': [-78.1964, 40.4620],

  // Rhode Island
  'Providence, RI': [-71.4128, 41.8240],
  'Warwick, RI': [-71.4162, 41.7001],
  'Cranston, RI': [-71.4372, 41.7798],
  'Pawtucket, RI': [-71.3826, 41.8787],

  // South Carolina
  'Charleston, SC': [-79.9311, 32.7765],
  'Columbia, SC': [-81.0348, 34.0007],
  'North Charleston, SC': [-79.9748, 32.8546],
  'Mount Pleasant, SC': [-79.8284, 32.7941],
  'Greenville, SC': [-82.3940, 34.8526],
  'Rock Hill, SC': [-81.0251, 34.9249],
  'Spartanburg, SC': [-81.9320, 34.9496],
  'Anderson, SC': [-82.6501, 34.5034],
  'Clover, SC': [-81.2265, 35.1112],
  'Seneca, SC': [-82.9535, 34.6857],

  // South Dakota
  'Sioux Falls, SD': [-96.7311, 43.5446],
  'Rapid City, SD': [-103.2310, 44.0805],
  'Aberdeen, SD': [-98.4864, 45.4647],

  // Tennessee
  'Nashville, TN': [-86.7816, 36.1627],
  'Memphis, TN': [-90.0490, 35.1495],
  'Knoxville, TN': [-83.9207, 35.9606],
  'Chattanooga, TN': [-85.3097, 35.0456],
  'Clarksville, TN': [-87.3595, 36.5298],
  'Murfreesboro, TN': [-86.3903, 35.8456],
  'Franklin, TN': [-86.8689, 35.9251],
  'Johnson City, TN': [-82.3535, 36.3134],

  // Texas
  'Houston, TX': [-95.3698, 29.7604],
  'San Antonio, TX': [-98.4936, 29.4241],
  'Dallas, TX': [-96.7970, 32.7767],
  'Austin, TX': [-97.7431, 30.2672],
  'Fort Worth, TX': [-97.3308, 32.7555],
  'El Paso, TX': [-106.4850, 31.7619],
  'Arlington, TX': [-97.1081, 32.7357],
  'Corpus Christi, TX': [-97.3964, 27.8006],
  'Plano, TX': [-96.6989, 33.0198],
  'Laredo, TX': [-99.5075, 27.5036],
  'Lubbock, TX': [-101.8456, 33.5779],
  'Garland, TX': [-96.6389, 32.9126],
  'Irving, TX': [-96.9489, 32.8140],
  'Amarillo, TX': [-101.8313, 35.2220],
  'Grand Prairie, TX': [-96.9978, 32.7460],
  'McKinney, TX': [-96.6399, 33.1972],
  'Frisco, TX': [-96.8236, 33.1507],
  'Brownsville, TX': [-97.4975, 25.9018],
  'Pasadena, TX': [-95.2091, 29.6911],
  'Mesquite, TX': [-96.5992, 32.7668],
  'Killeen, TX': [-97.7278, 31.1171],
  'McAllen, TX': [-98.2300, 26.2034],
  'Midland, TX': [-102.0779, 31.9974],
  'Denton, TX': [-97.1331, 33.2148],
  'Round Rock, TX': [-97.6789, 30.5083],
  'Waco, TX': [-97.1467, 31.5493],
  'Abilene, TX': [-99.7331, 32.4487],
  'Beaumont, TX': [-94.1018, 30.0802],
  'Odessa, TX': [-102.3676, 31.8457],
  'San Marcos, TX': [-97.9414, 29.8833],
  'College Station, TX': [-96.3344, 30.6280],
  'Tyler, TX': [-95.3011, 32.3513],
  'Lewisville, TX': [-96.9942, 33.0462],

  // Utah
  'Salt Lake City, UT': [-111.8910, 40.7608],
  'West Valley City, UT': [-111.9391, 40.6916],
  'Provo, UT': [-111.6585, 40.2338],
  'West Jordan, UT': [-111.9391, 40.6097],
  'Orem, UT': [-111.6946, 40.2969],
  'Sandy, UT': [-111.8338, 40.5649],
  'Ogden, UT': [-111.9738, 41.2230],
  'St. George, UT': [-113.5841, 37.0965],
  'Layton, UT': [-111.9711, 41.0602],

  // Vermont
  'Burlington, VT': [-73.2121, 44.4759],
  'Montpelier, VT': [-72.5754, 44.2601],
  'Rutland, VT': [-72.9726, 43.6106],

  // Virginia
  'Virginia Beach, VA': [-75.9780, 36.8529],
  'Norfolk, VA': [-76.2859, 36.8508],
  'Chesapeake, VA': [-76.2875, 36.7682],
  'Richmond, VA': [-77.4360, 37.5407],
  'Newport News, VA': [-76.4730, 37.0871],
  'Alexandria, VA': [-77.0469, 38.8048],
  'Hampton, VA': [-76.3452, 37.0299],
  'Roanoke, VA': [-79.9414, 37.2710],
  'Charlottesville, VA': [-78.4767, 38.0293],
  'Arlington, VA': [-77.0910, 38.8799],
  'Fairfax, VA': [-77.3064, 38.8462],
  'Lynchburg, VA': [-79.1422, 37.4138],

  // Washington
  'Seattle, WA': [-122.3321, 47.6062],
  'Spokane, WA': [-117.4260, 47.6588],
  'Tacoma, WA': [-122.4443, 47.2529],
  'Vancouver, WA': [-122.6615, 45.6387],
  'Bellevue, WA': [-122.2015, 47.6101],
  'Kent, WA': [-122.2348, 47.3809],
  'Everett, WA': [-122.2021, 47.9790],
  'Renton, WA': [-122.2171, 47.4829],
  'Olympia, WA': [-122.9007, 47.0379],
  'Redmond, WA': [-122.1215, 47.6740],
  'Kirkland, WA': [-122.2087, 47.6815],
  'Chimacum, WA': [-122.7821, 48.0167],
  'Spokake, WA': [-117.4260, 47.6588],

  // West Virginia
  'Charleston, WV': [-81.6326, 38.3498],
  'Huntington, WV': [-82.4452, 38.4192],
  'Morgantown, WV': [-79.9559, 39.6295],
  'Peterstown, WV': [-80.7543, 37.3968],

  // Wisconsin
  'Milwaukee, WI': [-87.9065, 43.0389],
  'Madison, WI': [-89.4012, 43.0731],
  'Green Bay, WI': [-88.0198, 44.5133],
  'Kenosha, WI': [-87.8212, 42.5847],
  'Racine, WI': [-87.7829, 42.7261],
  'Appleton, WI': [-88.4154, 44.2619],
  'Waukesha, WI': [-88.2315, 43.0117],
  'Oshkosh, WI': [-88.5426, 44.0247],
  'Eau Claire, WI': [-91.4985, 44.8113],
  'La Crosse, WI': [-91.2396, 43.8014],
  'Alma, WI': [-91.9163, 44.3247],
  'Strum, WI': [-91.3899, 44.5519],

  // Wyoming
  'Cheyenne, WY': [-104.8202, 41.1400],
  'Casper, WY': [-106.3131, 42.8666],
  'Laramie, WY': [-105.5911, 41.3114],
  'Gillette, WY': [-105.5022, 44.2911],

  // District of Columbia
  'Washington, DC': [-77.0369, 38.9072],

  // ── Additional cities from Airtable data ─────────────────────────────────
  // Alabama (additions)
  'Elberta, AL': [-87.5980, 30.4141],
  'Marion, AL': [-87.3192, 32.6324],

  // Alaska (additions)
  'Northway, AK': [-141.9372, 62.9606],

  // Arizona (additions)
  'Cibecue, AZ': [-110.4854, 34.0467],
  'Holbrook, AZ': [-110.1582, 34.9022],
  'Kayenta, AZ': [-110.2546, 36.7275],
  'Mohave Valley, AZ': [-114.5889, 35.0317],
  'Bagdad, AZ': [-113.2093, 34.5808],
  'Fort Defiance, AZ': [-109.0765, 35.7456],

  // California (additions)
  'Watsonville, CA': [-121.7569, 36.9103],
  'La Mesa, CA': [-117.0231, 32.7678],
  'Cupertino, CA': [-122.0322, 37.3229],
  'Rancho Cordova, CA': [-121.3028, 38.5891],
  'Vallejo, CA': [-122.2566, 38.1041],
  'Antioch, CA': [-121.8058, 38.0049],
  'Pleasant Hill, CA': [-122.0608, 37.9482],
  'Richmond, CA': [-122.3477, 37.9358],
  'Piedmont, CA': [-122.2316, 37.8246],
  'Pittsburg, CA': [-121.8847, 38.0280],
  'Napa, CA': [-122.2869, 38.2975],
  'Pleasanton, CA': [-121.8747, 37.6624],
  'Lafayette, CA': [-122.1180, 37.8858],
  'Wheatland, CA': [-121.4230, 39.0099],
  'San Lorenzo, CA': [-122.1425, 37.6810],
  'San Leandro, CA': [-122.1561, 37.7249],
  'Walnut Creek, CA': [-122.0652, 37.9101],
  'Daly City, CA': [-122.4702, 37.6879],
  'Castro Valley, CA': [-122.0864, 37.6941],
  'Carmel, CA': [-121.9233, 36.5554],
  'Rohnert Park, CA': [-122.7011, 38.3396],
  'St. Helena, CA': [-122.4697, 38.5052],
  'Dublin, CA': [-121.9358, 37.7022],
  'Santa Rosa, CA': [-122.7141, 38.4404],
  'Salinas, CA': [-121.6555, 36.6777],
  'Orinda, CA': [-122.1797, 37.8771],
  'Livermore, CA': [-121.7681, 37.6819],
  'San Rafael, CA': [-122.5311, 37.9735],
  'Grass Valley, CA': [-121.0610, 39.2193],

  // Colorado (additions)
  'Johnstown, CO': [-104.9522, 40.3369],

  // Connecticut (additions)
  'Hamden, CT': [-72.8968, 41.3959],
  'Berlin, CT': [-72.7454, 41.6215],

  // Florida (additions)
  'Plantation, FL': [-80.2331, 26.1276],
  'Miami Gardens, FL': [-80.2456, 25.9420],
  'Miami Springs, FL': [-80.2892, 25.8224],
  'St. Augustine, FL': [-81.3124, 29.8947],

  // Georgia (additions)
  'Metter, GA': [-82.0601, 32.3960],
  'Tucker, GA': [-84.2171, 33.8554],

  // Hawaii (additions)
  'Lihue, HI': [-159.3711, 21.9811],

  // Idaho (additions)
  'Paul, ID': [-113.7830, 42.6074],

  // Illinois (additions)
  'Annawan, IL': [-89.9068, 41.3914],
  'Kankakee, IL': [-87.8612, 41.1200],
  'Wheaton, IL': [-88.1070, 41.8661],

  // Indiana (additions)
  'Merrillville, IN': [-87.3328, 41.4828],
  'Griffith, IN': [-87.4237, 41.5284],
  'Ferdinand, IN': [-86.8622, 38.2239],
  'Elkhart, IN': [-85.9767, 41.6820],
  'Whitestown, IN': [-86.3458, 39.9970],

  // Iowa (additions)
  'Winterset, IA': [-94.0139, 41.3308],

  // Kentucky (additions)
  'Irvine, KY': [-83.9738, 37.7012],
  'Pineville, KY': [-83.6949, 36.7620],
  'Mount Vernon, KY': [-84.3535, 37.3534],
  'Brodhead, KY': [-84.4135, 37.4045],
  'Midway, KY': [-84.6838, 38.1512],
  'Right Fork School Center, KY': [-82.7360, 37.8200],
  'Vanceburg, KY': [-83.3188, 38.5923],
  'Somerset, KY': [-84.6041, 37.0920],

  // Maine (additions)
  'South Portland, ME': [-70.2798, 43.6415],

  // Maryland (additions)
  'Hyattsville, MD': [-76.9455, 38.9557],

  // Massachusetts (additions)
  'Clinton, MA': [-71.6829, 42.4168],

  // Michigan (additions)
  'Pontiac, MI': [-83.2910, 42.6389],
  'Bloomfield Hills, MI': [-83.2233, 42.5836],
  'Saline, MI': [-83.7816, 42.1667],
  'Howell, MI': [-83.9294, 42.6073],
  'Negaunee, MI': [-87.6112, 46.4842],
  'Rochester Hills, MI': [-83.1499, 42.6584],
  'Saginaw, MI': [-83.9508, 43.4195],
  'Kentwood, MI': [-85.6447, 42.8694],
  'Wyoming, MI': [-85.7053, 42.9134],
  'Fraser, MI': [-82.9494, 42.5392],
  'Holland, MI': [-86.1089, 42.7876],
  'Niles, MI': [-86.2542, 41.8298],
  'Hazel Park, MI': [-83.1041, 42.4620],
  'Bergland, MI': [-89.5732, 46.5908],
  'Northville, MI': [-83.4833, 42.4311],
  'Reed City, MI': [-85.5100, 43.8750],
  'Auburn Hills, MI': [-83.2341, 42.6875],
  'Saranac, MI': [-85.2131, 42.9292],
  'St. Clair Shores, MI': [-82.8963, 42.4970],
  'Big Rapids, MI': [-85.4837, 43.6983],
  'Waterford, MI': [-83.3816, 42.6926],
  'St. Joseph, MI': [-86.4889, 42.1097],
  'Rochester, MI': [-83.1338, 42.6806],
  'Goodrich, MI': [-83.5066, 42.9170],
  'Middleton, MI': [-84.7416, 43.1864],
  'Wayne, MI': [-83.3863, 42.2814],
  'Portage, MI': [-85.5800, 42.2012],
  'Marshall, MI': [-84.9633, 42.2722],
  'Berrien Springs, MI': [-86.3386, 41.9464],
  'Traverse City, MI': [-85.6206, 44.7631],
  'Franklin, MI': [-83.3055, 42.5225],
  'Napa, MI': [-83.6877, 43.6811],

  // Minnesota (additions)
  'St. Cloud, MN': [-94.1632, 45.5579],

  // Montana (additions)
  'Livingston, MT': [-110.5601, 45.6621],
  'Broadview, MT': [-108.8776, 46.0991],

  // New Hampshire (additions)
  'Windham, NH': [-71.3040, 42.8020],

  // New Jersey (additions)
  'Logan Township, NJ': [-75.3749, 39.7901],
  'Lindenwold, NJ': [-74.9990, 39.8243],

  // New Mexico (additions)
  'Zuni, NM': [-108.8476, 35.0692],
  'Bloomfield, NM': [-107.9845, 36.7114],
  'Raton, NM': [-104.4392, 36.8972],
  'Newcomb, NM': [-108.7048, 36.7750],
  'Gallina, NM': [-106.8567, 36.2375],
  'Bernalillo, NM': [-106.5514, 35.3003],
  'Espanola, NM': [-106.0806, 35.9911],
  'Española, NM': [-106.0806, 35.9911],
  'Mescalero, NM': [-105.7879, 33.1572],
  'Grants, NM': [-107.8517, 35.1475],
  'Cuba, NM': [-106.9592, 36.0189],
  'Farmington, NM': [-108.2187, 36.7281],
  'Santa Rosa, NM': [-104.6825, 34.9384],

  // New York (additions)
  'Fresh Meadows, NY': [-73.7907, 40.7343],

  // North Carolina (additions)
  'Enfield, NC': [-77.6669, 36.1810],
  'Gaston, NC': [-77.6444, 36.5071],
  'Rocky Point, NC': [-77.8883, 34.4296],
  'Sanford, NC': [-79.1803, 35.4799],

  // Ohio (additions)
  'Hilliard, OH': [-83.1582, 40.0334],
  'Chagrin Falls, OH': [-81.3929, 41.4314],
  'Graytown, OH': [-83.2710, 41.5228],
  'Copley, OH': [-81.6446, 41.0987],
  'Gates Mills, OH': [-81.4065, 41.5175],
  'Medina, OH': [-81.8637, 41.1384],
  'Sandusky, OH': [-82.7079, 41.4489],
  'West Liberty, OH': [-83.7555, 40.2528],
  'Beachwood, OH': [-81.5087, 41.4645],
  'Piedmont, OH': [-81.2268, 40.1492],
  'Franklin, OH': [-84.3041, 39.5590],

  // Pennsylvania (additions)
  'Coraopolis, PA': [-80.1668, 40.5184],
  'Claysburg, PA': [-78.4492, 40.2959],
  'Fishertown, PA': [-78.5900, 40.1284],

  // South Dakota (additions)
  'St. Francis, SD': [-100.8984, 43.1430],

  // Tennessee (additions)
  'Clinton, TN': [-84.1319, 36.1034],
  'Charlotte, TN': [-87.3400, 36.1773],
  'Fayetteville, TN': [-86.5706, 35.1520],

  // Texas (additions)
  'Lancaster, TX': [-96.7561, 32.5921],
  'Buda, TX': [-97.8392, 30.0852],

  // Washington (additions)
  'Yelm, WA': [-122.6307, 46.9418],

  // Wisconsin (additions)
  'Sheboygan, WI': [-87.7145, 43.7508],
  'Franklin, WI': [-88.0384, 42.8886],

  // Wyoming (additions)
  'Ethete, WY': [-108.7621, 42.9313],
};

// Build a case-insensitive lookup map once at module load
const _ciLookup = Object.fromEntries(
  Object.entries(CITY_COORDINATES).map(([k, v]) => [k.toLowerCase(), v])
);

/**
 * Look up coordinates for a city (case-insensitive).
 * @param {string} city — City name (e.g., "Austin")
 * @param {string} stateAbbr — 2-letter state code (e.g., "TX")
 * @returns {[number, number] | null} — [longitude, latitude] or null if not found
 */
export function getCityCoords(city, stateAbbr) {
  if (!city || !stateAbbr) return null;
  let normalized = city.trim();
  // Strip parenthetical qualifiers — e.g. "New York (Bronx)" → "New York"
  normalized = normalized.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const key = `${normalized}, ${stateAbbr.trim()}`.toLowerCase();
  return _ciLookup[key] || null;
}
