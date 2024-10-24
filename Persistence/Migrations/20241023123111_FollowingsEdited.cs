using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FollowingsEdited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowings_AspNetUsers_FollowedId",
                table: "UserFollowings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowings_AspNetUsers_FollowerId",
                table: "UserFollowings");

            migrationBuilder.RenameColumn(
                name: "FollowedId",
                table: "UserFollowings",
                newName: "TargetId");

            migrationBuilder.RenameColumn(
                name: "FollowerId",
                table: "UserFollowings",
                newName: "ObserverId");

            migrationBuilder.RenameIndex(
                name: "IX_UserFollowings_FollowedId",
                table: "UserFollowings",
                newName: "IX_UserFollowings_TargetId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowings_AspNetUsers_ObserverId",
                table: "UserFollowings",
                column: "ObserverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowings_AspNetUsers_TargetId",
                table: "UserFollowings",
                column: "TargetId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowings_AspNetUsers_ObserverId",
                table: "UserFollowings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowings_AspNetUsers_TargetId",
                table: "UserFollowings");

            migrationBuilder.RenameColumn(
                name: "TargetId",
                table: "UserFollowings",
                newName: "FollowedId");

            migrationBuilder.RenameColumn(
                name: "ObserverId",
                table: "UserFollowings",
                newName: "FollowerId");

            migrationBuilder.RenameIndex(
                name: "IX_UserFollowings_TargetId",
                table: "UserFollowings",
                newName: "IX_UserFollowings_FollowedId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowings_AspNetUsers_FollowedId",
                table: "UserFollowings",
                column: "FollowedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowings_AspNetUsers_FollowerId",
                table: "UserFollowings",
                column: "FollowerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
