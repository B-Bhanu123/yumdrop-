const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SERVICES = [
  'api-gateway',
  'user-auth-service',
  'restaurant-catalog-service',
  'order-dispatch-service',
  'payment-billing-service',
  'notification-service',
  'analytics-service'
];

function generateEnterpriseServiceModule(serviceName, moduleIndex) {
  const serviceDir = path.join(ROOT_DIR, 'services', serviceName, 'src', 'generated');
  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir, { recursive: true });
  }

  const fileName = `domain-contract-module-${moduleIndex}.ts`;
  const filePath = path.join(serviceDir, fileName);

  let lines = [];
  lines.push(`/**`);
  lines.push(` * YumDrop Enterprise Domain Contract Module #${moduleIndex} for ${serviceName}`);
  lines.push(` * Auto-generated schema definition, validation logic, and RPC client interface.`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`export interface DomainEntitySchema${moduleIndex} {`);
  lines.push(`  id: string;`);
  lines.push(`  tenantId: string;`);
  lines.push(`  serviceOrigin: string;`);
  lines.push(`  schemaVersion: number;`);
  lines.push(`  metadata: Record<string, any>;`);
  lines.push(`  createdAt: string;`);
  lines.push(`  updatedAt: string;`);
  lines.push(`}`);
  lines.push(``);

  // Generate 50 distinct domain method definitions per module
  for (let i = 1; i <= 30; i++) {
    lines.push(`export class EnterpriseDomainHandler_${moduleIndex}_${i} {`);
    lines.push(`  private instanceId: string = 'inst_${serviceName}_${moduleIndex}_${i}';`);
    lines.push(``);
    lines.push(`  public async validatePayload_${i}(payload: any): Promise<boolean> {`);
    lines.push(`    if (!payload || typeof payload !== 'object') {`);
    lines.push(`      throw new Error('Invalid payload passed to ${serviceName} handler ${moduleIndex}_${i}');`);
    lines.push(`    }`);
    lines.push(`    const keys = Object.keys(payload);`);
    lines.push(`    console.log(\`Validating \${keys.length} fields for instance \${this.instanceId}\`);`);
    lines.push(`    return keys.length > 0;`);
    lines.push(`  }`);
    lines.push(``);
    lines.push(`  public async processTransaction_${i}(tenantId: string, data: Record<string, any>): Promise<DomainEntitySchema${moduleIndex}> {`);
    lines.push(`    const validated = await this.validatePayload_${i}(data);`);
    lines.push(`    if (!validated) {`);
    lines.push(`      throw new Error('Validation failed for transaction');`);
    lines.push(`    }`);
    lines.push(`    return {`);
    lines.push(`      id: \`tx_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,`);
    lines.push(`      tenantId,`);
    lines.push(`      serviceOrigin: '${serviceName}',`);
    lines.push(`      schemaVersion: 1,`);
    lines.push(`      metadata: { ...data, handlerId: '${moduleIndex}_${i}' },`);
    lines.push(`      createdAt: new Date().toISOString(),`);
    lines.push(`      updatedAt: new Date().toISOString()`);
    lines.push(`    };`);
    lines.push(`  }`);
    lines.push(``);
    lines.push(`  public async auditLog_${i}(action: string, entityId: string): Promise<void> {`);
    lines.push(`    const logEntry = \`[AUDIT] [\${new Date().toISOString()}] [\${this.instanceId}] Action: \${action} | Entity: \${entityId}\`;`);
    lines.push(`    console.log(logEntry);`);
    lines.push(`  }`);
    lines.push(`}`);
    lines.push(``);
  }

  fs.writeFileSync(filePath, lines.join('\n'));
}

console.log('Generating enterprise domain modules across 7 microservices...');

// Generate modules for each service
SERVICES.forEach(service => {
  for (let m = 1; m <= 25; m++) {
    generateEnterpriseServiceModule(service, m);
  }
});

console.log('Domain modules generated successfully.');
