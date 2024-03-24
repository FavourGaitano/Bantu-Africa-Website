import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getmeetingPackagesService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM MeetingPackages");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getonemeetingPackageService = async (PackageId) => {
  try {
    const result = await poolRequest()
      .input("PackageId", sql.VarChar, PackageId)
      .query("SELECT * FROM MeetingPackages WHERE PackageId = @PackageId");

    return result.recordset[0];
  } catch (error) {
    console.log("Error fetching meeting package:", error);
    throw error;
  }
};

export const deletePackageService = async (PackageId) => {
  try {
    const result = await poolRequest().input(
      "PackageId",
      sql.VarChar,
      PackageId
    ).query(`
              DELETE FROM MeetingPackages
              WHERE PackageId = @PackageId
          `);

    return result;
  } catch (error) {
    console.error("Error in deletePackageService:", error);
    return error;
  }
};

export const doesMeetingPackageExist = async (packageName) => {
  try {
    const result = await poolRequest()
      .input("PackageName", sql.VarChar, packageName)
      .query("SELECT 1 FROM MeetingPackages WHERE PackageName = @PackageName");

    return result.recordset.length > 0;
  } catch (error) {
    console.error("Error checking for existing meeting package:", error);
    throw error;
  }
};

export const createmeetingPackageService = async (meetingpackage) => {
  try {
    const result = await poolRequest()
      .input("PackageId", sql.VarChar, meetingpackage.PackageId)
      .input("PackageName", sql.VarChar, meetingpackage.PackageName)
      .query(
        "INSERT INTO MeetingPackages (PackageId, PackageName) VALUES (@PackageId, @PackageName)"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const updatemeetingpackageService = async (
  PackageId,
  updatedPackage
) => {
  const { PackageName } = updatedPackage;
  try {
    const result = await poolRequest()
      .input("PackageId", sql.VarChar(255), PackageId)
      .input("PackageName", sql.VarChar(255), PackageName)
      .query(
        "UPDATE MeetingPackages SET PackageName=@PackageName WHERE PackageId=@PackageId"
      );
    return result;
  } catch (error) {
    return error;
  }
};
