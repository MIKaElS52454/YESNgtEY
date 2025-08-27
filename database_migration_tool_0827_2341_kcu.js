// 代码生成时间: 2025-08-27 23:41:30
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// 定义数据库迁移工具
class DatabaseMigrationTool {
  // 构造函数，初始化迁移工具的基本属性
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  // 执行数据库迁移
  async migrate() {
    try {
      // 检查迁移脚本目录是否存在
      if (!fs.existsSync(this.dbConfig.migrationsDir)) {
        throw new Error('Migrations directory does not exist');
      }

      // 获取所有迁移脚本文件
      const migrationFiles = fs.readdirSync(this.dbConfig.migrationsDir);

      // 过滤出尚未执行的迁移脚本
      const pendingMigrations = migrationFiles.filter(
        file => !fs.existsSync(
          path.join(this.dbConfig.completedMigrationsDir, file)
        )
      );

      if (pendingMigrations.length === 0) {
        console.log('All migrations have been applied');
        return;
      }

      // 执行每个迁移脚本
      for (const file of pendingMigrations) {
        const migrationPath = path.join(this.dbConfig.migrationsDir, file);
        const upCommand = `node ${migrationPath} up`;

        // 执行迁移命令
        const { stdout, stderr } = await exec(upCommand);

        // 检查迁移是否成功执行
        if (stderr) {
          throw new Error(`Migration failed: ${stderr}`);
        }

        // 将成功执行的迁移脚本复制到已完成目录
        fs.copyFileSync(migrationPath, path.join(
          this.dbConfig.completedMigrationsDir, file
        ));

        console.log(`Migration ${file} applied successfully`);
      }

      console.log('All pending migrations have been applied');
    } catch (error) {
      // 错误处理
      console.error('Migration failed:', error.message);
    }
  }
}

// 示例配置
const dbConfig = {
  migrationsDir: path.join(__dirname, 'migrations'),
  completedMigrationsDir: path.join(__dirname, 'completed_migrations')
};

// 创建数据库迁移工具实例
const migrationTool = new DatabaseMigrationTool(dbConfig);

// 执行数据库迁移
migrationTool.migrate();