// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 序数  (T:経過日数)
eq(format(20150101, 'T'),     '1');
eq(format(20150101, 'T>0'),   '1st');
eq(format(20150102, 'T>0'),   '2nd');
eq(format(20150103, 'T>0'),   '3rd');
eq(format(20150104, 'T>0'),   '4th');
eq(format(20150105, 'T>0'),   '5th');
eq(format(20150106, 'T>0'),   '6th');
eq(format(20150107, 'T>0'),   '7th');
eq(format(20150108, 'T>0'),   '8th');
eq(format(20150109, 'T>0'),   '9th');
eq(format(20150110, 'T>0'),  '10th');
eq(format(20150111, 'T>0'),  '11th');
eq(format(20150112, 'T>0'),  '12th');
eq(format(20150113, 'T>0'),  '13th');
eq(format(20150114, 'T>0'),  '14th');
eq(format(20150115, 'T>0'),  '15th');
eq(format(20150116, 'T>0'),  '16th');
eq(format(20150117, 'T>0'),  '17th');
eq(format(20150118, 'T>0'),  '18th');
eq(format(20150119, 'T>0'),  '19th');
eq(format(20150120, 'T>0'),  '20th');
eq(format(20150121, 'T>0'),  '21st');
eq(format(20150122, 'T>0'),  '22nd');
eq(format(20150123, 'T>0'),  '23rd');
eq(format(20150124, 'T>0'),  '24th');
eq(format(20150125, 'T>0'),  '25th');
eq(format(20150126, 'T>0'),  '26th');
eq(format(20150127, 'T>0'),  '27th');
eq(format(20150128, 'T>0'),  '28th');
eq(format(20150129, 'T>0'),  '29th');
eq(format(20150130, 'T>0'),  '30th');
eq(format(20150131, 'T>0'),  '31st');

eq(format(20150201, 'T>0'),  '32nd');
eq(format(20150202, 'T>0'),  '33rd');
eq(format(20150203, 'T>0'),  '34th');
eq(format(20150204, 'T>0'),  '35th');
eq(format(20150205, 'T>0'),  '36th');
eq(format(20150206, 'T>0'),  '37th');
eq(format(20150207, 'T>0'),  '38th');
eq(format(20150208, 'T>0'),  '39th');
eq(format(20150209, 'T>0'),  '40th');
eq(format(20150210, 'T>0'),  '41st');
eq(format(20150211, 'T>0'),  '42nd');
eq(format(20150212, 'T>0'),  '43rd');
eq(format(20150213, 'T>0'),  '44th');
eq(format(20150214, 'T>0'),  '45th');
eq(format(20150215, 'T>0'),  '46th');
eq(format(20150216, 'T>0'),  '47th');
eq(format(20150217, 'T>0'),  '48th');
eq(format(20150218, 'T>0'),  '49th');
eq(format(20150219, 'T>0'),  '50th');
eq(format(20150220, 'T>0'),  '51st');
eq(format(20150221, 'T>0'),  '52nd');
eq(format(20150222, 'T>0'),  '53rd');
eq(format(20150223, 'T>0'),  '54th');
eq(format(20150224, 'T>0'),  '55th');
eq(format(20150225, 'T>0'),  '56th');
eq(format(20150226, 'T>0'),  '57th');
eq(format(20150227, 'T>0'),  '58th');
eq(format(20150228, 'T>0'),  '59th');

eq(format(20150301, 'T>0'),  '60th');
eq(format(20150302, 'T>0'),  '61st');
eq(format(20150303, 'T>0'),  '62nd');
eq(format(20150304, 'T>0'),  '63rd');
eq(format(20150305, 'T>0'),  '64th');
eq(format(20150306, 'T>0'),  '65th');
eq(format(20150307, 'T>0'),  '66th');
eq(format(20150308, 'T>0'),  '67th');
eq(format(20150309, 'T>0'),  '68th');
eq(format(20150310, 'T>0'),  '69th');
eq(format(20150311, 'T>0'),  '70th');
eq(format(20150312, 'T>0'),  '71st');
eq(format(20150313, 'T>0'),  '72nd');
eq(format(20150314, 'T>0'),  '73rd');
eq(format(20150315, 'T>0'),  '74th');
eq(format(20150316, 'T>0'),  '75th');
eq(format(20150317, 'T>0'),  '76th');
eq(format(20150318, 'T>0'),  '77th');
eq(format(20150319, 'T>0'),  '78th');
eq(format(20150320, 'T>0'),  '79th');
eq(format(20150321, 'T>0'),  '80th');
eq(format(20150322, 'T>0'),  '81st');
eq(format(20150323, 'T>0'),  '82nd');
eq(format(20150324, 'T>0'),  '83rd');
eq(format(20150325, 'T>0'),  '84th');
eq(format(20150326, 'T>0'),  '85th');
eq(format(20150327, 'T>0'),  '86th');
eq(format(20150328, 'T>0'),  '87th');
eq(format(20150329, 'T>0'),  '88th');
eq(format(20150330, 'T>0'),  '89th');
eq(format(20150331, 'T>0'),  '90th');

eq(format(20150401, 'T>0'),  '91st');
eq(format(20150402, 'T>0'),  '92nd');
eq(format(20150403, 'T>0'),  '93rd');
eq(format(20150404, 'T>0'),  '94th');
eq(format(20150405, 'T>0'),  '95th');
eq(format(20150406, 'T>0'),  '96th');
eq(format(20150407, 'T>0'),  '97th');
eq(format(20150408, 'T>0'),  '98th');
eq(format(20150409, 'T>0'),  '99th');
eq(format(20150410, 'T>0'), '100th');
eq(format(20150411, 'T>0'), '101st');
eq(format(20150412, 'T>0'), '102nd');
eq(format(20150413, 'T>0'), '103rd');
eq(format(20150414, 'T>0'), '104th');
eq(format(20150415, 'T>0'), '105th');
eq(format(20150416, 'T>0'), '106th');
eq(format(20150417, 'T>0'), '107th');
eq(format(20150418, 'T>0'), '108th');
eq(format(20150419, 'T>0'), '109th');
eq(format(20150420, 'T>0'), '110th');
eq(format(20150421, 'T>0'), '111th');
eq(format(20150422, 'T>0'), '112th');
eq(format(20150423, 'T>0'), '113th');
eq(format(20150424, 'T>0'), '114th');
eq(format(20150425, 'T>0'), '115th');
eq(format(20150426, 'T>0'), '116th');
eq(format(20150427, 'T>0'), '117th');
eq(format(20150428, 'T>0'), '118th');
eq(format(20150429, 'T>0'), '119th');
eq(format(20150430, 'T>0'), '120th');

eq(format(20150501, 'T>0'), '121st');
eq(format(20150502, 'T>0'), '122nd');
eq(format(20150503, 'T>0'), '123rd');
eq(format(20150504, 'T>0'), '124th');
eq(format(20150505, 'T>0'), '125th');
eq(format(20150506, 'T>0'), '126th');
eq(format(20150507, 'T>0'), '127th');
eq(format(20150508, 'T>0'), '128th');
eq(format(20150509, 'T>0'), '129th');
eq(format(20150510, 'T>0'), '130th');
eq(format(20150511, 'T>0'), '131st');
eq(format(20150512, 'T>0'), '132nd');
eq(format(20150513, 'T>0'), '133rd');
eq(format(20150514, 'T>0'), '134th');
eq(format(20150515, 'T>0'), '135th');
eq(format(20150516, 'T>0'), '136th');
eq(format(20150517, 'T>0'), '137th');
eq(format(20150518, 'T>0'), '138th');
eq(format(20150519, 'T>0'), '139th');
eq(format(20150520, 'T>0'), '140th');
eq(format(20150521, 'T>0'), '141st');
eq(format(20150522, 'T>0'), '142nd');
eq(format(20150523, 'T>0'), '143rd');
eq(format(20150524, 'T>0'), '144th');
eq(format(20150525, 'T>0'), '145th');
eq(format(20150526, 'T>0'), '146th');
eq(format(20150527, 'T>0'), '147th');
eq(format(20150528, 'T>0'), '148th');
eq(format(20150529, 'T>0'), '149th');

eq(format(20150530, 'T>0'), '150th');
eq(format(20150531, 'T>0'), '151st');
eq(format(20150601, 'T>0'), '152nd');
eq(format(20150602, 'T>0'), '153rd');
eq(format(20150603, 'T>0'), '154th');
eq(format(20150604, 'T>0'), '155th');
eq(format(20150605, 'T>0'), '156th');
eq(format(20150606, 'T>0'), '157th');
eq(format(20150607, 'T>0'), '158th');
eq(format(20150608, 'T>0'), '159th');
eq(format(20150609, 'T>0'), '160th');
eq(format(20150610, 'T>0'), '161st');
eq(format(20150611, 'T>0'), '162nd');
eq(format(20150612, 'T>0'), '163rd');
eq(format(20150613, 'T>0'), '164th');
eq(format(20150614, 'T>0'), '165th');
eq(format(20150615, 'T>0'), '166th');
eq(format(20150616, 'T>0'), '167th');
eq(format(20150617, 'T>0'), '168th');
eq(format(20150618, 'T>0'), '169th');
eq(format(20150619, 'T>0'), '170th');
eq(format(20150620, 'T>0'), '171st');
eq(format(20150621, 'T>0'), '172nd');
eq(format(20150622, 'T>0'), '173rd');
eq(format(20150623, 'T>0'), '174th');
eq(format(20150624, 'T>0'), '175th');
eq(format(20150625, 'T>0'), '176th');
eq(format(20150626, 'T>0'), '177th');
eq(format(20150627, 'T>0'), '178th');
eq(format(20150628, 'T>0'), '179th');
eq(format(20150629, 'T>0'), '180th');
eq(format(20150630, 'T>0'), '181st');

eq(format(20150701, 'T>0'), '182nd');
eq(format(20150702, 'T>0'), '183rd');
eq(format(20150703, 'T>0'), '184th');
eq(format(20150704, 'T>0'), '185th');
eq(format(20150705, 'T>0'), '186th');
eq(format(20150706, 'T>0'), '187th');
eq(format(20150707, 'T>0'), '188th');
eq(format(20150708, 'T>0'), '189th');
eq(format(20150709, 'T>0'), '190th');
eq(format(20150710, 'T>0'), '191st');
eq(format(20150711, 'T>0'), '192nd');
eq(format(20150712, 'T>0'), '193rd');
eq(format(20150713, 'T>0'), '194th');
eq(format(20150714, 'T>0'), '195th');
eq(format(20150715, 'T>0'), '196th');
eq(format(20150716, 'T>0'), '197th');
eq(format(20150717, 'T>0'), '198th');
eq(format(20150718, 'T>0'), '199th');
eq(format(20150719, 'T>0'), '200th');
eq(format(20150720, 'T>0'), '201st');
eq(format(20150721, 'T>0'), '202nd');
eq(format(20150722, 'T>0'), '203rd');
eq(format(20150723, 'T>0'), '204th');
eq(format(20150724, 'T>0'), '205th');
eq(format(20150725, 'T>0'), '206th');
eq(format(20150726, 'T>0'), '207th');
eq(format(20150727, 'T>0'), '208th');
eq(format(20150728, 'T>0'), '209th');
eq(format(20150729, 'T>0'), '210th');
eq(format(20150730, 'T>0'), '211th');
eq(format(20150731, 'T>0'), '212th');

eq(format(20150801, 'T>0'), '213th');
eq(format(20150802, 'T>0'), '214th');
eq(format(20150803, 'T>0'), '215th');
eq(format(20150804, 'T>0'), '216th');
eq(format(20150805, 'T>0'), '217th');
eq(format(20150806, 'T>0'), '218th');
eq(format(20150807, 'T>0'), '219th');
eq(format(20150808, 'T>0'), '220th');
eq(format(20150809, 'T>0'), '221st');
eq(format(20150810, 'T>0'), '222nd');
eq(format(20150811, 'T>0'), '223rd');
eq(format(20150812, 'T>0'), '224th');
eq(format(20150813, 'T>0'), '225th');
eq(format(20150814, 'T>0'), '226th');
eq(format(20150815, 'T>0'), '227th');
eq(format(20150816, 'T>0'), '228th');
eq(format(20150817, 'T>0'), '229th');
eq(format(20150818, 'T>0'), '230th');
eq(format(20150819, 'T>0'), '231st');
eq(format(20150820, 'T>0'), '232nd');
eq(format(20150821, 'T>0'), '233rd');
eq(format(20150822, 'T>0'), '234th');
eq(format(20150823, 'T>0'), '235th');
eq(format(20150824, 'T>0'), '236th');
eq(format(20150825, 'T>0'), '237th');
eq(format(20150826, 'T>0'), '238th');
eq(format(20150827, 'T>0'), '239th');
eq(format(20150828, 'T>0'), '240th');
eq(format(20150829, 'T>0'), '241st');
eq(format(20150830, 'T>0'), '242nd');
eq(format(20150831, 'T>0'), '243rd');

eq(format(20150901, 'T>0'), '244th');
eq(format(20150902, 'T>0'), '245th');
eq(format(20150903, 'T>0'), '246th');
eq(format(20150904, 'T>0'), '247th');
eq(format(20150905, 'T>0'), '248th');
eq(format(20150906, 'T>0'), '249th');
eq(format(20150907, 'T>0'), '250th');
eq(format(20150908, 'T>0'), '251st');
eq(format(20150909, 'T>0'), '252nd');
eq(format(20150910, 'T>0'), '253rd');
eq(format(20150911, 'T>0'), '254th');
eq(format(20150912, 'T>0'), '255th');
eq(format(20150913, 'T>0'), '256th');
eq(format(20150914, 'T>0'), '257th');
eq(format(20150915, 'T>0'), '258th');
eq(format(20150916, 'T>0'), '259th');
eq(format(20150917, 'T>0'), '260th');
eq(format(20150918, 'T>0'), '261st');
eq(format(20150919, 'T>0'), '262nd');
eq(format(20150920, 'T>0'), '263rd');
eq(format(20150921, 'T>0'), '264th');
eq(format(20150922, 'T>0'), '265th');
eq(format(20150923, 'T>0'), '266th');
eq(format(20150924, 'T>0'), '267th');
eq(format(20150925, 'T>0'), '268th');
eq(format(20150926, 'T>0'), '269th');
eq(format(20150927, 'T>0'), '270th');
eq(format(20150928, 'T>0'), '271st');
eq(format(20150929, 'T>0'), '272nd');
eq(format(20150930, 'T>0'), '273rd');

eq(format(20151001, 'T>0'), '274th');
eq(format(20151002, 'T>0'), '275th');
eq(format(20151003, 'T>0'), '276th');
eq(format(20151004, 'T>0'), '277th');
eq(format(20151005, 'T>0'), '278th');
eq(format(20151006, 'T>0'), '279th');
eq(format(20151007, 'T>0'), '280th');
eq(format(20151008, 'T>0'), '281st');
eq(format(20151009, 'T>0'), '282nd');
eq(format(20151010, 'T>0'), '283rd');
eq(format(20151011, 'T>0'), '284th');
eq(format(20151012, 'T>0'), '285th');
eq(format(20151013, 'T>0'), '286th');
eq(format(20151014, 'T>0'), '287th');
eq(format(20151015, 'T>0'), '288th');
eq(format(20151016, 'T>0'), '289th');
eq(format(20151017, 'T>0'), '290th');
eq(format(20151018, 'T>0'), '291st');
eq(format(20151019, 'T>0'), '292nd');
eq(format(20151020, 'T>0'), '293rd');
eq(format(20151021, 'T>0'), '294th');
eq(format(20151022, 'T>0'), '295th');
eq(format(20151023, 'T>0'), '296th');
eq(format(20151024, 'T>0'), '297th');
eq(format(20151025, 'T>0'), '298th');
eq(format(20151026, 'T>0'), '299th');
eq(format(20151027, 'T>0'), '300th');
eq(format(20151028, 'T>0'), '301st');
eq(format(20151029, 'T>0'), '302nd');
eq(format(20151030, 'T>0'), '303rd');
eq(format(20151031, 'T>0'), '304th');
eq(format(20151101, 'T>0'), '305th');
eq(format(20151102, 'T>0'), '306th');
eq(format(20151103, 'T>0'), '307th');
eq(format(20151104, 'T>0'), '308th');
eq(format(20151105, 'T>0'), '309th');

eq(format(20151106, 'T>0'), '310th');
eq(format(20151107, 'T>0'), '311th');
eq(format(20151108, 'T>0'), '312th');
eq(format(20151109, 'T>0'), '313th');
eq(format(20151110, 'T>0'), '314th');
eq(format(20151111, 'T>0'), '315th');
eq(format(20151112, 'T>0'), '316th');
eq(format(20151113, 'T>0'), '317th');
eq(format(20151114, 'T>0'), '318th');
eq(format(20151115, 'T>0'), '319th');
eq(format(20151116, 'T>0'), '320th');
eq(format(20151117, 'T>0'), '321st');
eq(format(20151118, 'T>0'), '322nd');
eq(format(20151119, 'T>0'), '323rd');
eq(format(20151120, 'T>0'), '324th');
eq(format(20151121, 'T>0'), '325th');
eq(format(20151122, 'T>0'), '326th');
eq(format(20151123, 'T>0'), '327th');
eq(format(20151124, 'T>0'), '328th');
eq(format(20151125, 'T>0'), '329th');
eq(format(20151126, 'T>0'), '330th');
eq(format(20151127, 'T>0'), '331st');
eq(format(20151128, 'T>0'), '332nd');
eq(format(20151129, 'T>0'), '333rd');
eq(format(20151130, 'T>0'), '334th');

eq(format(20151201, 'T>0'), '335th');
eq(format(20151202, 'T>0'), '336th');
eq(format(20151203, 'T>0'), '337th');
eq(format(20151204, 'T>0'), '338th');
eq(format(20151205, 'T>0'), '339th');
eq(format(20151206, 'T>0'), '340th');
eq(format(20151207, 'T>0'), '341st');
eq(format(20151208, 'T>0'), '342nd');
eq(format(20151209, 'T>0'), '343rd');
eq(format(20151210, 'T>0'), '344th');
eq(format(20151211, 'T>0'), '345th');
eq(format(20151212, 'T>0'), '346th');
eq(format(20151213, 'T>0'), '347th');
eq(format(20151214, 'T>0'), '348th');
eq(format(20151215, 'T>0'), '349th');
eq(format(20151216, 'T>0'), '350th');
eq(format(20151217, 'T>0'), '351st');
eq(format(20151218, 'T>0'), '352nd');
eq(format(20151219, 'T>0'), '353rd');
eq(format(20151220, 'T>0'), '354th');
eq(format(20151221, 'T>0'), '355th');
eq(format(20151222, 'T>0'), '356th');
eq(format(20151223, 'T>0'), '357th');
eq(format(20151224, 'T>0'), '358th');
eq(format(20151225, 'T>0'), '359th');
eq(format(20151226, 'T>0'), '360th');
eq(format(20151227, 'T>0'), '361st');
eq(format(20151228, 'T>0'), '362nd');
eq(format(20151229, 'T>0'), '363rd');
eq(format(20151230, 'T>0'), '364th');
eq(format(20151231, 'T>0'), '365th');
