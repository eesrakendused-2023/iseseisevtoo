let currentMonster, currentMonsterHP, currentMonsterBaseHP, currentMonsterDamage, currentMonsterArmour, exileHealth, exileDMG, baseExileDMG, exileArmourm, exileBaseArmour, chaosCount
let killCount=0;
let exileBaseHealth=50
exileHealth=50;
chaosCount=100;
exileDMG=10;
//Armour is used to mitigate damage from enemies
let exileArmour=30;

//TODO: Introduce Movementspeed - more ticks ps boots
//TODO: Think about reflective damage to/from enemies

//TODO: Loot could be decided based on mosnter healthpool
//One idea is to make health random between some params
var monsters = [
  {monsterName:"Skeleton", healthpool:100, lootRNG:1, armour:0, damage:5, img:"../projekt/images/Skeleton.png"},
  {monsterName:"Necromancer", healthpool:150, lootRNG:1.5, armour:20, damage:5, img:"../projekt/images/Necromancer.jpg"},
  {monsterName:"Totem", healthpool:75, lootRNG:0.5, armour:5, damage:5, img:"../projekt/images/Totem.jpg"},
  
];
//TODO:Make an objecto of upgrades to be used
//TODO:add img to items
//TODO:incremental increase of price?
//Each item should have multiple tiers. Say Rusted sword has 5 tiers,---each upgrade has incremental increase, but also inc dmg
let currentWeaponUpgrade=0;
var upgradesWeapon=[
  {upgradeName:"Rusted Sword", upgradeDMG:3, upgradeCost:10, currentTier:0, icon:"../projekt/images/Swords/Rusted_Sword.png"},
  {upgradeName:"Copper Sword", upgradeDMG:5, upgradeCost:12, currentTier:0, icon:"../projekt/images/Swords/Copper_Sword.png"},
  {upgradeName:"Broad Sword", upgradeDMG:10, upgradeCost:15, currentTier:0, icon:"../projekt/images/Swords/Broad_Sword.png"},
  {upgradeName:"Elegant Sword", upgradeDMG:15, upgradeCost:20, currentTier:0, icon:"../projekt/images/Swords/Elegant_Sword.png"},
  {upgradeName:"Anarchic Spiritblade", upgradeDMG:15, upgradeCost:20, currentTier:0, icon:"../projekt/images/Swords/Anarchic_Spiritblade.png"},
];
let currentHelmetUpgrade=0;
var upgradesHelmet=[
  {upgradeName:"Battered Helmet", upgradeArmour:1, upgradeCost:3, currentTier:0, icon:"../projekt/images/Helmets/Battered_Helm.png"},
  {upgradeName:"Iron Hat", upgradeArmour:3, upgradeCost:10, currentTier:0, icon:"../projekt/images/Helmets/Iron_Hat.png"},
  {upgradeName:"Cone Helmet", upgradeArmour:5, upgradeCost:12, currentTier:0, icon:"../projekt/images/Helmets/Cone_Helmet.png"},
  {upgradeName:"Barbute Helmet", upgradeArmour:10, upgradeCost:15, currentTier:0, icon:"../projekt/images/Helmets/Barbute_Helmet.png"},
  {upgradeName:"Ezomyte Burgonet", upgradeArmour:15, upgradeCost:20, currentTier:0, icon:"../projekt/images/Helmets/Ezomyte_Burgonet.png"},
];
let currentOffhandUpgrade=0;
var upgradesOffhand=[
  {upgradeName:"Battered Helmet", upgradeArmour:1, upgradeCost:3, currentTier:0, icon:"../projekt/images/Helmets/Battered_Helm.png"},
  {upgradeName:"Iron Hat", upgradeArmour:3, upgradeCost:10, currentTier:0, icon:"../projekt/images/Helmets/Iron_Hat.png"},
  {upgradeName:"Cone Helmet", upgradeArmour:5, upgradeCost:12, currentTier:0, icon:"../projekt/images/Helmets/Cone_Helmet.png"},
  {upgradeName:"Barbute Helmet", upgradeArmour:10, upgradeCost:15, currentTier:0, icon:"../projekt/images/Helmets/Barbute_Helmet.png"},
  {upgradeName:"Ezomyte Burgonet", upgradeArmour:15, upgradeCost:20, currentTier:0, icon:"../projekt/images/Helmets/Ezomyte_Burgonet.png"},
];
let currentGlovesUpgrade=0;
var upgradesGloves=[
  {upgradeName:"Battered Helmet", upgradeArmour:1, upgradeCost:3, currentTier:0, icon:"../projekt/images/Helmets/Battered_Helm.png"},
  {upgradeName:"Iron Hat", upgradeArmour:3, upgradeCost:10, currentTier:0, icon:"../projekt/images/Helmets/Iron_Hat.png"},
  {upgradeName:"Cone Helmet", upgradeArmour:5, upgradeCost:12, currentTier:0, icon:"../projekt/images/Helmets/Cone_Helmet.png"},
  {upgradeName:"Barbute Helmet", upgradeArmour:10, upgradeCost:15, currentTier:0, icon:"../projekt/images/Helmets/Barbute_Helmet.png"},
  {upgradeName:"Ezomyte Burgonet", upgradeArmour:15, upgradeCost:20, currentTier:0, icon:"../projekt/images/Helmets/Ezomyte_Burgonet.png"},
];
let currentRingUpgrade=0;
var upgradesRing=[
  {upgradeName:"Battered Helmet", upgradeArmour:1, upgradeCost:3, currentTier:0, icon:"../projekt/images/Helmets/Battered_Helm.png"},
  {upgradeName:"Iron Hat", upgradeArmour:3, upgradeCost:10, currentTier:0, icon:"../projekt/images/Helmets/Iron_Hat.png"},
  {upgradeName:"Cone Helmet", upgradeArmour:5, upgradeCost:12, currentTier:0, icon:"../projekt/images/Helmets/Cone_Helmet.png"},
  {upgradeName:"Barbute Helmet", upgradeArmour:10, upgradeCost:15, currentTier:0, icon:"../projekt/images/Helmets/Barbute_Helmet.png"},
  {upgradeName:"Ezomyte Burgonet", upgradeArmour:15, upgradeCost:20, currentTier:0, icon:"../projekt/images/Helmets/Ezomyte_Burgonet.png"},
];
//Var only used for first time ran. Temp solution
let firstRun = true;
//Main function
function ExileMain(){
  if(firstRun){
    //Setting some base stat values for Exile
    document.getElementById("StatsHealth").innerHTML="Health: "+exileHealth;
    document.getElementById("StatsDMG").innerHTML="DMG: "+exileDMG;
    document.getElementById("StatsArmour").innerHTML="Armour: "+exileArmour;
    document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
    firstRun=false;
  }
  ExileDoDamage();
  EnemyDoDamage();
  if(exileHealth<=0){
    console.log("Exile has perished!"); 
    intervalManager(false); 
    setTimeout(ExilePerished, 3000)
    //ExilePerished();
  }
  if(chaosCount>=10){document.getElementById("ExileWeaponUpgrade").style.visibility = "visible";}
  if(chaosCount>=25){document.getElementById("ExileHelmetUpgrade").style.visibility = "visible";}
  if(chaosCount>=25){document.getElementById("ExileOffhandUpgrade").style.visibility = "visible";}
  if(chaosCount>=25){document.getElementById("ExileGlovesUpgrade").style.visibility = "visible";}
  if(chaosCount>=25){document.getElementById("ExileRingUpgrade").style.visibility = "visible";}
  console.log(currentMonsterHP);
}
//TODO: Not sure about manual clicker. Probably not
/*function exileClicker(){

}*/

function chooseNextMonster(){
  let nextMonster = Math.round(Math.random()*(monsters.length-1));
  currentMonster = monsters[nextMonster].monsterName
  currentMonsterHP = monsters[nextMonster].healthpool
  currentMonsterBaseHP = monsters[nextMonster].healthpool
  currentMonsterArmour = monsters[nextMonster].armour
  currentMonsterDamage = monsters[nextMonster].damage
  console.log("New monster is: " + currentMonster + ", HP: " + currentMonsterHP)
  document.getElementById("currentMonster").innerHTML = currentMonster+" HP: "+currentMonsterHP+"/"+currentMonsterBaseHP;
  document.getElementById("currentMonsterImage").innerHTML =  "<img src='"+monsters[nextMonster].img+"' width='100px' height='100px'>"
  document.getElementById("health").value = currentMonsterBaseHP;
  document.getElementById("health").max = currentMonsterBaseHP;
  
}

function lootGamba(){
  //TODO: Scale loot based on mosnterHP
  let chaosGained = currentMonsterBaseHP/100
  chaosCount+=Math.round(chaosGained);
  console.log("You got " + chaosGained + " chaos")
  console.log("Current chaos stack: " + chaosCount)
  document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
}
//
function ExileDoDamage(){
  //damage = Armour/(Armour+10*Raw dmg dealt)
  let damageDealtToEnemy = Math.round(exileDMG-((currentMonsterArmour/(currentMonsterArmour+10*exileDMG))*exileDMG))
  console.log("Armour rating: "+currentMonsterArmour+" mydmg: " +exileDMG+" dmg dealt: "+ damageDealtToEnemy)
  currentMonsterHP-=damageDealtToEnemy;
  document.getElementById("health").value = currentMonsterHP;
  document.getElementById("currentMonster").innerHTML = currentMonster+" HP: "+currentMonsterHP+"/"+currentMonsterBaseHP;

  if (currentMonsterHP<=0){
    lootGamba();
    chooseNextMonster();}
}

function EnemyDoDamage(){
  let damageDealtToExile = Math.round(currentMonsterDamage-((exileArmour/(exileArmour+10*currentMonsterDamage))*currentMonsterDamage))
  exileHealth-=damageDealtToExile;
  console.log(damageDealtToExile, exileHealth, currentMonsterDamage, exileArmour)
  //TODO: Show Exile health on screen
  document.getElementById("StatsHealth").innerHTML="Health: "+exileHealth;
}
//--------------------------------------------Upgrades--------------------------------------------------
//------------------------------------------------------------------------------------------------------
function ExileWeaponUpgrade(){

  upgradesWeapon[currentWeaponUpgrade].currentTier++
  if(upgradesWeapon[currentWeaponUpgrade].currentTier==3){
    currentWeaponUpgrade++
    if(currentWeaponUpgrade>=upgradesWeapon.length-1){currentWeaponUpgrade=upgradesWeapon.length-1}
  }
  exileDMG+=upgradesWeapon[currentWeaponUpgrade].upgradeDMG;
  chaosCount-=upgradesWeapon[currentWeaponUpgrade].upgradeCost;
  document.getElementById("StatsDMG").innerHTML="DMG: "+exileDMG;
  document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
  document.getElementById("WeaponUpgrade").src=upgradesWeapon[currentWeaponUpgrade].icon;
}

function ExileHelmetUpgrade(){
  
  upgradesHelmet[currentHelmetUpgrade].currentTier++
  if(upgradesHelmet[currentHelmetUpgrade].currentTier==3){
    currentHelmetUpgrade++
    if(currentHelmetUpgrade>=upgradesHelmet.length-1){currentHelmetUpgrade=upgradesHelmet.length-1}
  }
  
  exileArmour+=upgradesHelmet[currentHelmetUpgrade].upgradeArmour;
  chaosCount-=upgradesHelmet[currentHelmetUpgrade].upgradeCost;
  document.getElementById("StatsArmour").innerHTML="Armour: "+exileArmour;
  document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
  document.getElementById("HelmetUpgrade").src=upgradesHelmet[currentHelmetUpgrade].icon;
  //document.getElementById("HelmetUpgrade").src="../projekt/images/Helmets/Iron_Hat.png";
}

function ExileOffhandUpgrade(){

  upgradesWeapon[currentWeaponUpgrade].currentTier++
  if(upgradesWeapon[currentWeaponUpgrade].currentTier==3){
    currentWeaponUpgrade++
    if(currentWeaponUpgrade>=upgradesWeapon.length-1){currentWeaponUpgrade=upgradesWeapon.length-1}
  }
  exileDMG+=upgradesWeapon[currentWeaponUpgrade].upgradeDMG;
  chaosCount-=upgradesWeapon[currentWeaponUpgrade].upgradeCost;
  document.getElementById("StatsDMG").innerHTML="DMG: "+exileDMG;
  document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
  document.getElementById("OffhandUpgrade").src=upgradesWeapon[currentWeaponUpgrade].icon;
}

function ExileGlovesUpgrade(){

  upgradesWeapon[currentWeaponUpgrade].currentTier++
  if(upgradesWeapon[currentWeaponUpgrade].currentTier==3){
    currentWeaponUpgrade++
    if(currentWeaponUpgrade>=upgradesWeapon.length-1){currentWeaponUpgrade=upgradesWeapon.length-1}
  }
  exileDMG+=upgradesWeapon[currentWeaponUpgrade].upgradeDMG;
  chaosCount-=upgradesWeapon[currentWeaponUpgrade].upgradeCost;
  document.getElementById("StatsDMG").innerHTML="DMG: "+exileDMG;
  document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
  document.getElementById("GlovesUpgrade").src=upgradesWeapon[currentWeaponUpgrade].icon;
}

function ExileRingUpgrade(){

  upgradesWeapon[currentWeaponUpgrade].currentTier++
  if(upgradesWeapon[currentWeaponUpgrade].currentTier==3){
    currentWeaponUpgrade++
    if(currentWeaponUpgrade>=upgradesWeapon.length-1){currentWeaponUpgrade=upgradesWeapon.length-1}
  }
  exileDMG+=upgradesWeapon[currentWeaponUpgrade].upgradeDMG;
  chaosCount-=upgradesWeapon[currentWeaponUpgrade].upgradeCost;
  document.getElementById("StatsDMG").innerHTML="DMG: "+exileDMG;
  document.getElementById("chaosCount").innerHTML = "Chaos: " + chaosCount;
  document.getElementById("RingUpgrade").src=upgradesWeapon[currentWeaponUpgrade].icon;
}
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

function CheckChaos(){
  //TODO: If chaos count is less then price of upgrade > grey out button / unable to upgrade to go through
  //for(let i=0; i<x; i++){
  //  if(upgrade[i].upgradeCost>chaosCount){}
  //}
}

function ExileRefill(){
  //TODO: Implement base health var, health altering items, bring in "maxHealth var"
  exileHealth=exileBaseHealth;
}

function ExilePerished(){
  
  ExileRefill();
  chooseNextMonster();
  intervalManager(true, 2000)
}


//Managing the state of the interval
//If exiles dies interval gets cleared until 3 seconds has passed > then Interval gets set again
var mainInterval = null;

function intervalManager(flag) {
   if(flag){
    mainInterval =  setInterval(ExileMain, 2000);
   }

   else
     clearInterval(mainInterval);
}
intervalManager(true, 2000)
//Runnin main function every second, acts like 1 tick/second
//setInterval(ExileMain, 2000)