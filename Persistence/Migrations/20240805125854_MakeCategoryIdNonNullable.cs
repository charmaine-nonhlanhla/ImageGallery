using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MakeCategoryIdNonNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Set a default value for CategoryId where it is currently null
            migrationBuilder.Sql("UPDATE Photos SET CategoryId = 1 WHERE CategoryId IS NULL");

            // Alter the column to be non-nullable
            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Photos",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert the column to be nullable
            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Photos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: false);
        }
    }
}
