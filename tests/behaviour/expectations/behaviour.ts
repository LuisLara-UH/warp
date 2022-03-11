import { Dir, Expect, File } from './types';
import { flatten } from './utils';

export const expectations = flatten(
  new Dir('tests', [
    new Dir('behaviour', [
      new Dir('contracts', [
        File.Simple('example', [
          Expect.Simple('test', [], []),
          Expect.Simple('returnTest', [], ['12', '0']),
        ]),
        new Dir('public_state', [File.Simple('state_vars', [Expect.Simple('x', [], ['10', '0'])])]),
        new Dir('assignments', [
          File.Simple('functionSingle', [
            Expect.Simple('test', ['3'], ['3']),
            Expect.Simple('test256', ['3', '4'], ['3', '4']),
          ]),
          File.Simple('scalar', [
            Expect.Simple('test', ['3'], ['3']),
            Expect.Simple('test256', ['3', '4'], ['3', '4']),
          ]),
        ]),
        new Dir('conversions', [
          File.Simple('signedIdentity', [
            Expect.Simple('implicit', ['210', '11', '12'], ['210', '11', '12']),
            Expect.Simple('explicit', ['200', '300', '400'], ['200', '300', '400']),
          ]),
          File.Simple('signedNarrowing', [
            Expect.Simple(
              'explicit',
              ['63005', '1000', '2000'],
              ['29', '70778732319555200400381918345807787983848'],
            ),
          ]),
          File.Simple('signedWidening', [
            Expect.Simple('implicit', ['10'], ['10', '10', '0']),
            Expect.Simple(
              'implicit',
              ['250'],
              [
                '65530',
                '340282366920938463463374607431768211450',
                '340282366920938463463374607431768211455',
              ],
            ),
            Expect.Simple('explicit', ['20'], ['20', '20', '0']),
            Expect.Simple(
              'explicit',
              ['240'],
              [
                '65520',
                '340282366920938463463374607431768211440',
                '340282366920938463463374607431768211455',
              ],
            ),
          ]),
          File.Simple('unsignedIdentity', [
            Expect.Simple('implicit', ['210', '11', '12'], ['210', '11', '12']),
            Expect.Simple('explicit', ['200', '300', '400'], ['200', '300', '400']),
          ]),
          File.Simple('unsignedNarrowing', [
            Expect.Simple(
              'explicit',
              ['63005', '1000', '2000'],
              ['29', '70778732319555200400381918345807787983848'],
            ),
          ]),
          File.Simple('unsignedWidening', [
            Expect.Simple('implicit', ['10'], ['10', '10', '0']),
            Expect.Simple('implicit', ['250'], ['250', '250', '0']),
            Expect.Simple('explicit', ['20'], ['20', '20', '0']),
            Expect.Simple('explicit', ['240'], ['240', '240', '0']),
          ]),
        ]),
        // covers nested mappings
        new Dir('Dai', [
          new File('dai', 'Dai', [
            new Expect('mint', [
              ['mint', ['1', '10000', '0'], ['1'], '1'],
              ['getBalance', ['1'], ['10000', '0'], '1'],
            ]),
            new Expect('transfer', [
              ['transfer', ['2', '4000', '0'], ['1'], '1'],
              ['getBalance', ['2'], ['4000', '0'], '1'],
              ['getBalance', ['1'], ['6000', '0'], '1'],
            ]),
            new Expect('approve', [
              ['approve', ['3', '300', '0'], ['1'], '2'],
              ['getAllowance', ['2', '3'], ['300', '0'], '2'],
            ]),
            new Expect('transferFrom', [
              ['transferFrom', ['2', '1', '200', '0'], ['1'], '3'],
              ['getBalance', ['2'], ['3800', '0'], '1'],
              ['getBalance', ['1'], ['6200', '0'], '1'],
            ]),
            new Expect('allowance after transferFrom', [
              ['getAllowance', ['2', '3'], ['100', '0'], '2'],
            ]),
            new Expect('increase allowance', [
              ['increaseAllowance', ['3', '100', '0'], ['1'], '2'],
              ['getAllowance', ['2', '3'], ['200', '0'], '2'],
            ]),
            new Expect('decrease allowance', [
              ['decreaseAllowance', ['3', '131', '0'], ['1'], '2'],
              ['getAllowance', ['2', '3'], ['69', '0'], '2'],
            ]),
          ]),
        ]),
        new Dir('enums', [
          File.Simple('singleEnum', [
            Expect.Simple('get', [], ['0']),
            new Expect('set', [
              ['set', ['254'], [], '0'],
              ['get', [], ['254'], '0'],
            ]),
            new Expect('callSetInternally', [
              ['callSetInternally', ['128'], [], '0'],
              ['get', [], ['128'], '0'],
            ]),
            new Expect('cancel', [
              ['cancel', [], [], '0'],
              ['get', [], ['255'], '0'],
            ]),
          ]),
          File.Simple('singleEnum7', [
            Expect.Simple('get', [], ['0']),
            new Expect('set', [
              ['set', ['257'], [], '0'],
              ['get', [], ['257'], '0'],
            ]),
            new Expect('callSetInternally', [
              ['callSetInternally', ['128'], [], '0'],
              ['get', [], ['128'], '0'],
            ]),
            new Expect('cancel', [
              ['cancel', [], [], '0'],
              ['get', [], ['259'], '0'],
            ]),
          ]),
          File.Simple('doubleEnum', [
            Expect.Simple('a', [], ['2']),
            Expect.Simple('getTopEnum', [], ['0']),
            new Expect('setB', [
              ['setB', [], [], '0'],
              ['a', [], ['1'], '0'],
              ['getTopEnum', [], ['4'], '0'],
            ]),
            new Expect('setBAgain', [
              ['setB', [], [], '0'],
              ['a', [], ['0'], '0'],
              ['getTopEnum', [], ['1'], '0'],
            ]),
          ]),
        ]),
        new Dir('ERC20', [
          File.Simple('ERC20', [
            new Expect('mint', [
              ['mint', ['1', '5', '0'], ['1'], '0'],
              ['balanceOf', ['1'], ['5', '0'], '0'],
            ]),
            new Expect('transferFrom', [
              ['mint', ['2', '600', '0'], ['1'], '0'],
              ['transferFrom', ['2', '3', '400', '0'], ['1'], '0'],
              ['balanceOf', ['2'], ['200', '0'], '0'],
              ['balanceOf', ['3'], ['400', '0'], '0'],
            ]),
            Expect.Simple('totalSupply', [], ['100000000000000', '0']),
            Expect.Simple('decimals', [], ['18']),
            new Expect('transfer', [
              ['mint', ['4', '600', '0'], ['1'], '0'],
              ['transfer', ['5', '400', '0'], ['1'], '4'],
              ['balanceOf', ['4'], ['200', '0'], '0'],
              ['balanceOf', ['5'], ['400', '0'], '0'],
            ]),
          ]),
        ]),
        new Dir('expressions', [
          File.Simple('ineffectual', [Expect.Simple('test', ['1'], ['1'])]),
          File.Simple('literals', [
            Expect.Simple('unsignedNarrow', [], ['255', '251', '0', '0']),
            Expect.Simple('signedNarrow', [], ['127', '120', '0', '156', '128']),
            Expect.Simple(
              'unsignedWide',
              [],
              [
                '340282366920938463463374607431768211455',
                '340282366920938463463374607431768211455',
                '10',
                '4722366482869645213696',
                '251',
                '0',
                '0',
                '0',
                '0',
                '0',
              ],
            ),
            Expect.Simple(
              'signedWide',
              [],
              [
                '340282366920938463463374607431768211455',
                '170141183460469231731687303715884105727',
                '10',
                '4722366482869645213696',
                '120',
                '0',
                '0',
                '0',
                '340282366920938463463374607431768211356',
                '340282366920938463463374607431768211455',
                '5',
                '340282366920938463463370103832140840960',
                '0',
                '170141183460469231731687303715884105728',
              ],
            ),
          ]),
        ]),
        new Dir('external_input_checks', [
          File.Simple('external_input_checks', [
            new Expect('testing solidity pure public signed int8 lower bound', [
              ['testInt8', ['0'], ['0'], '0'],
            ]),
            new Expect('testing solidity pure public signed int8 upper bound', [
              ['testInt8', ['255'], ['255'], '0'],
            ]),
            new Expect('testing solidity pure public signed int8 overflow', [
              [
                'testInt8',
                ['256'],
                null,
                '0',
                'Error: value out-of-bounds. Value must be less than 2**8',
              ],
            ]),
            new Expect('testing solidity pure external signed int8 overflow', [
              [
                'testInt8External',
                ['256'],
                null,
                '0',
                'Error: value out-of-bounds. Value must be less than 2**8',
              ],
            ]),
            new Expect('testing solidity pure public unsigned int32 overflow', [
              [
                'testUint32',
                ['4294967296'],
                null,
                '0',
                'Error: value out-of-bounds. Value must be less than 2**32',
              ],
            ]),
            new Expect('testing solidity unsigned view public int32 in upper bound', [
              ['testUint32', ['4294967295'], ['4294967295'], '0'],
            ]),
            new Expect('testing solidity signed int248 upper bound', [
              [
                'testInt248',
                ['452312848583266388373324160190187140051835877600158453279131187530910662655'],
                ['452312848583266388373324160190187140051835877600158453279131187530910662655'],
                '0',
              ],
            ]),
            new Expect('testing soldity unsigned int248 overflow', [
              [
                'testInt248',
                ['452312848583266388373324160190187140051835877600158453279131187530910662656'],
                null,
                '0',
              ],
            ]),
            new Expect('testing solidity unsigned int256 in bounds', [
              [
                'testInt256',
                ['0', '340282366920938463463374607431768211455'],
                ['0', '340282366920938463463374607431768211455'],
                '0',
              ],
            ]),
            new Expect('testing soldity unsigned int256 in bounds', [
              [
                'testInt256',
                ['340282366920938463463374607431768211455', '0'],
                ['340282366920938463463374607431768211455', '0'],
                '0',
              ],
            ]),
            new Expect('testing solidity unsigned int256 lower out of bounds', [
              [
                'testInt256',
                ['0', '340282366920938463463374607431768211456'],
                null,
                '0',
                'Error: value out-of-bounds. Values passed to high and low members of Uint256 must be less than 2**128.',
              ],
            ]),
            new Expect('testing solidity unsigned int256 high out of bounds', [
              [
                'testInt256',
                ['340282366920938463463374607431768211456', '0'],
                null,
                '0',
                'Error: value out-of-bounds. Values passed to high and low members of Uint256 must be less than 2**128.',
              ],
            ]),
            new Expect('testing solidity unsigned int256 lower and high out of bounds', [
              [
                'testInt256',
                [
                  '340282366920938463463374607431768211456',
                  '340282366920938463463374607431768211456',
                ],
                null,
                '0',
                'Error: value out-of-bounds. Values passed to high and low members of Uint256 must be less than 2**128.',
              ],
            ]),
          ]),
        ]),
        new Dir('inheritance', [
          new Dir('functions', [
            new File('base', 'Base', [Expect.Simple('g', ['3'], ['3'])]),
            new File('mid', 'Mid', [Expect.Simple('g', ['10'], ['20'])]),
            new File('derived', 'Derived', [Expect.Simple('f', ['5'], ['15'])]),
          ]),
          new Dir('variables', [
            new File('derived', 'Derived', [Expect.Simple('f', [], ['36', '0', '24', '0'])]),
          ]),
        ]),
        new Dir('loops', [
          File.Simple('loops', [
            Expect.Simple('forLoop', ['3'], ['8']),
            Expect.Simple('whileLoop', ['10'], ['10']),
            Expect.Simple('breaks', ['5'], ['5']),
            Expect.Simple('continues', ['4'], ['24']),
            Expect.Simple('doWhile', ['0', '4'], ['5']),
            Expect.Simple('doWhile', ['7', '6'], ['8']),
            Expect.Simple('doWhile_continue', ['1'], ['1']),
            Expect.Simple('doWhile_return', ['4'], ['2']),
            Expect.Simple('doWhile_break', ['0', '2'], ['2']),
          ]),
        ]),
        new Dir('maths', [
          File.Simple('addition', [
            Expect.Simple('addition8safe', ['3', '20'], ['23']),
            Expect.Simple('addition8safe', ['200', '180'], null, 'overflow'),
            Expect.Simple('addition8unsafe', ['3', '20'], ['23']),
            Expect.Simple('addition8unsafe', ['200', '180'], ['124'], 'overflow'),
            Expect.Simple('addition120safe', ['6', '8'], ['14']),
            Expect.Simple(
              'addition120safe',
              ['900000000000000000000000000000000000', '800000000000000000000000000000000000'],
              null,
              'overflow',
            ),
            Expect.Simple('addition120unsafe', ['6', '8'], ['14']),
            Expect.Simple(
              'addition120unsafe',
              ['900000000000000000000000000000000000', '800000000000000000000000000000000000'],
              ['370772004215084127096192939719655424'],
              'overflow',
            ),
            Expect.Simple('addition256safe', ['20', '1', '5', '2'], ['25', '3']),
            Expect.Simple('addition256unsafe', ['20', '1', '5', '2'], ['25', '3']),
            Expect.Simple('addition8signedsafe', ['3', '20'], ['23']),
            Expect.Simple('addition8signedsafe', ['100', '90'], null, 'overflow'),
            Expect.Simple('addition8signedunsafe', ['3', '20'], ['23']),
            Expect.Simple('addition8signedunsafe', ['100', '90'], ['190'], 'overflow'),
            Expect.Simple('addition120signedsafe', ['6', '8'], ['14']),
            Expect.Simple(
              'addition120signedsafe',
              ['400000000000000000000000000000000000', '450000000000000000000000000000000000'],
              null,
              'overflow',
            ),
            Expect.Simple('addition120signedunsafe', ['6', '8'], ['14']),
            Expect.Simple(
              'addition120signedunsafe',
              ['400000000000000000000000000000000000', '450000000000000000000000000000000000'],
              ['850000000000000000000000000000000000'],
              'overflow',
            ),
            Expect.Simple('addition256signedsafe', ['20', '1', '5', '2'], ['25', '3']),
            Expect.Simple(
              'addition256signedsafe',
              [
                '340282366920938463463374607431768211455',
                '340282366920938463463374607431768211455',
                '1',
                '0',
              ],
              ['0', '0'],
            ),
            Expect.Simple('addition256signedunsafe', ['20', '1', '5', '2'], ['25', '3']),
          ]),
          File.Simple('bitwise_and', [
            Expect.Simple('bitwise_and8safe', ['15', '45'], ['13']),
            Expect.Simple('bitwise_and8signedsafe', ['15', '45'], ['13']),
            Expect.Simple('bitwise_and8unsafe', ['15', '45'], ['13']),
            Expect.Simple('bitwise_and8signedunsafe', ['15', '45'], ['13']),
            Expect.Simple('bitwise_and256safe', ['15', '90', '45', '80'], ['13', '80']),
            Expect.Simple('bitwise_and256signedsafe', ['15', '90', '45', '80'], ['13', '80']),
            Expect.Simple('bitwise_and256unsafe', ['15', '90', '45', '80'], ['13', '80']),
            Expect.Simple('bitwise_and256signedunsafe', ['15', '90', '45', '80'], ['13', '80']),
          ]),
          File.Simple('bitwise_or', [
            Expect.Simple('bitwise_or8safe', ['14', '57'], ['63']),
            Expect.Simple('bitwise_or8signedsafe', ['14', '57'], ['63']),
            Expect.Simple('bitwise_or8unsafe', ['14', '57'], ['63']),
            Expect.Simple('bitwise_or8signedunsafe', ['14', '57'], ['63']),
            Expect.Simple('bitwise_or256safe', ['14', '13', '57', '100'], ['63', '109']),
            Expect.Simple('bitwise_or256signedsafe', ['14', '13', '57', '100'], ['63', '109']),
            Expect.Simple('bitwise_or256unsafe', ['14', '13', '57', '100'], ['63', '109']),
            Expect.Simple('bitwise_or256signedunsafe', ['14', '13', '57', '100'], ['63', '109']),
          ]),
          File.Simple('decrement', [
            Expect.Simple('preDecrementStatement', ['10'], ['9']),
            Expect.Simple('postDecrementStatement', ['10'], ['9']),
            Expect.Simple('preDecrementExpression', ['10'], ['9', '9']),
            Expect.Simple('postDecrementExpression', ['10'], ['10', '9']),
          ]),
          File.Simple('division', [
            Expect.Simple('division8safe', ['100', '5'], ['20']),
            Expect.Simple('division8signedsafe', ['100', '5'], ['20']),
            Expect.Simple('division8unsafe', ['100', '5'], ['20']),
            Expect.Simple('division8signedunsafe', ['100', '5'], ['20']),
            Expect.Simple('division256safe', ['100', '20', '5', '0'], ['20', '4']),
            Expect.Simple('division256signedsafe', ['100', '20', '5', '0'], ['20', '4']),
            Expect.Simple('division256unsafe', ['100', '20', '5', '0'], ['20', '4']),
            Expect.Simple('division256signedunsafe', ['100', '20', '5', '0'], ['20', '4']),
          ]),
          File.Simple('eq', [
            Expect.Simple('eq8safe', ['1', '2'], ['0']),
            Expect.Simple('eq8signedsafe', ['1', '1'], ['1']),
            Expect.Simple('eq8unsafe', ['1', '1'], ['1']),
            Expect.Simple('eq8signedunsafe', ['1', '2'], ['0']),
            Expect.Simple('eq256safe', ['1', '2', '1', '2'], ['1']),
            Expect.Simple('eq256signedsafe', ['1', '2', '3', '2'], ['0']),
            Expect.Simple('eq256unsafe', ['1', '2', '1', '3'], ['0']),
            Expect.Simple('eq256signedunsafe', ['1', '2', '1', '2'], ['1']),
          ]),
          File.Simple('exp', [
            Expect.Simple('exp8safe', ['0', '0'], ['0']),
            Expect.Simple('exp8signedsafe', ['255', '10'], ['1']),
            Expect.Simple('exp8unsafe', ['100', '1'], ['100']),
            Expect.Simple('exp8signedunsafe', ['4', '3'], ['64']),
            Expect.Simple('exp256safe', ['0', '0', '1', '0'], ['0', '0']),
            Expect.Simple('exp256signedsafe', ['1000', '500', '0', '0'], ['1', '0']),
            Expect.Simple('exp256unsafe', ['2', '0', '3', '0'], ['8', '0']),
            Expect.Simple('exp256signedunsafe', ['0', '0', '0', '0'], ['0', '0']),
          ]),
          File.Simple('ge', [
            Expect.Simple('ge8safe', ['1', '2'], ['0']),
            Expect.Simple('ge8signedsafe', ['255', '1'], ['0']),
            Expect.Simple('ge8unsafe', ['2', '1'], ['1']),
            Expect.Simple('ge8signedunsafe', ['5', '100'], ['0']),
            Expect.Simple('ge256safe', ['20', '3', '20', '3'], ['1']),
            Expect.Simple('ge256signedsafe', ['2', '3', '1', '4'], ['0']),
            Expect.Simple('ge256unsafe', ['1', '5', '3', '2'], ['1']),
            Expect.Simple('ge256signedunsafe', ['1', '1', '1', '1'], ['1']),
          ]),
          File.Simple('gt', [
            Expect.Simple('gt8safe', ['1', '2'], ['0']),
            Expect.Simple('gt8signedsafe', ['255', '1'], ['0']),
            Expect.Simple('gt8unsafe', ['2', '1'], ['1']),
            Expect.Simple('gt8signedunsafe', ['5', '100'], ['0']),
            Expect.Simple('gt256safe', ['20', '3', '20', '3'], ['0']),
            Expect.Simple('gt256signedsafe', ['2', '3', '1', '4'], ['0']),
            Expect.Simple('gt256unsafe', ['1', '5', '3', '2'], ['1']),
            Expect.Simple('gt256signedunsafe', ['1', '1', '1', '1'], ['0']),
          ]),
          File.Simple('increment', [
            Expect.Simple('preIncrementStatement', ['10'], ['11']),
            Expect.Simple('postIncrementStatement', ['10'], ['11']),
            Expect.Simple('preIncrementExpression', ['10'], ['11', '11']),
            Expect.Simple('postIncrementExpression', ['10'], ['10', '11']),
          ]),
          File.Simple('le', [
            Expect.Simple('le8safe', ['1', '2'], ['1']),
            Expect.Simple('le8signedsafe', ['255', '1'], ['1']),
            Expect.Simple('le8unsafe', ['2', '1'], ['0']),
            Expect.Simple('le8signedunsafe', ['5', '100'], ['1']),
            Expect.Simple('le256safe', ['20', '3', '20', '3'], ['1']),
            Expect.Simple('le256signedsafe', ['2', '3', '1', '4'], ['1']),
            Expect.Simple('le256unsafe', ['1', '5', '3', '2'], ['0']),
            Expect.Simple('le256signedunsafe', ['1', '1', '1', '1'], ['1']),
          ]),
          File.Simple('lt', [
            Expect.Simple('lt8safe', ['1', '2'], ['1']),
            Expect.Simple('lt8signedsafe', ['255', '1'], ['1']),
            Expect.Simple('lt8unsafe', ['2', '1'], ['0']),
            Expect.Simple('lt8signedunsafe', ['5', '100'], ['1']),
            Expect.Simple('lt256safe', ['20', '3', '20', '3'], ['0']),
            Expect.Simple('lt256signedsafe', ['2', '3', '1', '4'], ['1']),
            Expect.Simple('lt256unsafe', ['1', '5', '3', '2'], ['0']),
            Expect.Simple('lt256signedunsafe', ['1', '1', '1', '1'], ['0']),
          ]),
          File.Simple('multiplication', [
            Expect.Simple('multiplication8safe', ['4', '6'], ['24']),
            Expect.Simple('multiplication8safe', ['100', '40'], null, 'overflow'),
            Expect.Simple('multiplication8unsafe', ['4', '6'], ['24']),
            Expect.Simple('multiplication128safe', ['4', '6'], ['24']),
            Expect.Simple('multiplication128unsafe', ['4', '6'], ['24']),
            Expect.Simple('multiplication8unsafe', ['100', '40'], ['160'], 'overflow'),
            Expect.Simple('multiplication256safe', ['20', '1', '5', '0'], ['100', '5']),
            Expect.Simple('multiplication256unsafe', ['20', '0', '5', '1'], ['100', '20']),
            Expect.Simple('multiplication8signedsafe', ['255', '255'], ['1']),
            Expect.Simple('multiplication8signedsafe', ['100', '40'], null, 'overflow'),
            Expect.Simple('multiplication8signedunsafe', ['192', '2'], ['128']),
            Expect.Simple('multiplication8signedunsafe', ['100', '40'], ['160'], 'overflow'),
            Expect.Simple('multiplication128signedsafe', ['255', '255'], ['65025']),
            Expect.Simple('multiplication128signedunsafe', ['192', '2'], ['384']),
            Expect.Simple('multiplication256signedsafe', ['20', '1', '5', '0'], ['100', '5']),
            Expect.Simple('multiplication256signedunsafe', ['20', '0', '5', '1'], ['100', '20']),
          ]),
          File.Simple('neq', [
            Expect.Simple('neq8safe', ['1', '2'], ['1']),
            Expect.Simple('neq8signedsafe', ['1', '1'], ['0']),
            Expect.Simple('neq8unsafe', ['1', '1'], ['0']),
            Expect.Simple('neq8signedunsafe', ['1', '2'], ['1']),
            Expect.Simple('neq256safe', ['1', '2', '1', '2'], ['0']),
            Expect.Simple('neq256signedsafe', ['1', '2', '3', '2'], ['1']),
            Expect.Simple('neq256unsafe', ['1', '2', '1', '3'], ['1']),
            Expect.Simple('neq256signedunsafe', ['1', '2', '1', '2'], ['0']),
          ]),
          File.Simple('shl', [
            Expect.Simple('shl8safe', ['3', '4'], ['48']),
            Expect.Simple('shl8unsafe', ['3', '4'], ['48']),
            Expect.Simple('shl8signedsafe', ['3', '4'], ['48']),
            Expect.Simple('shl8signedunsafe', ['3', '4'], ['48']),
            Expect.Simple('shl8_256safe', ['3', '4', '0'], ['48']),
            Expect.Simple('shl8_256unsafe', ['3', '4', '0'], ['48']),
            Expect.Simple('shl8_256signedsafe', ['3', '4', '0'], ['48']),
            Expect.Simple('shl8_256signedunsafe', ['3', '4', '0'], ['48']),
            Expect.Simple('shl256safe', ['3', '5', '4'], ['48', '80']),
            Expect.Simple('shl256unsafe', ['3', '5', '4'], ['48', '80']),
            Expect.Simple('shl256signedsafe', ['3', '5', '4'], ['48', '80']),
            Expect.Simple('shl256signedunsafe', ['3', '5', '4'], ['48', '80']),
            Expect.Simple('shl256_256safe', ['3', '5', '4', '0'], ['48', '80']),
            Expect.Simple('shl256_256unsafe', ['3', '5', '4', '0'], ['48', '80']),
            Expect.Simple('shl256_256signedsafe', ['3', '5', '4', '0'], ['48', '80']),
            Expect.Simple('shl256_256signedunsafe', ['3', '5', '4', '0'], ['48', '80']),
          ]),
          File.Simple('shr', [
            Expect.Simple('shr8safe', ['100', '2'], ['25']),
            Expect.Simple('shr8unsafe', ['100', '2'], ['25']),
            Expect.Simple('shr8signedsafe', ['100', '2'], ['25']),
            Expect.Simple('shr8signedunsafe', ['100', '2'], ['25']),
            Expect.Simple('shr8_256safe', ['100', '2', '0'], ['25']),
            Expect.Simple('shr8_256unsafe', ['100', '2', '0'], ['25']),
            Expect.Simple('shr8_256signedsafe', ['100', '2', '0'], ['25']),
            Expect.Simple('shr8_256signedunsafe', ['100', '2', '0'], ['25']),
            Expect.Simple('shr256safe', ['100', '20', '2'], ['25', '5']),
            Expect.Simple('shr256unsafe', ['100', '20', '2'], ['25', '5']),
            Expect.Simple('shr256signedsafe', ['100', '20', '2'], ['25', '5']),
            Expect.Simple('shr256signedunsafe', ['100', '20', '2'], ['25', '5']),
            Expect.Simple('shr256_256safe', ['100', '20', '2', '0'], ['25', '5']),
            Expect.Simple('shr256_256unsafe', ['100', '20', '2', '0'], ['25', '5']),
            Expect.Simple('shr256_256signedsafe', ['100', '20', '2', '0'], ['25', '5']),
            Expect.Simple('shr256_256signedunsafe', ['100', '20', '2', '0'], ['25', '5']),
          ]),
          File.Simple('subtraction', [
            Expect.Simple('subtraction8safe', ['31', '2'], ['29']),
            Expect.Simple('subtraction8safe', ['20', '180'], null, 'overflow'),
            Expect.Simple('subtraction8unsafe', ['32', '20'], ['12']),
            Expect.Simple('subtraction8unsafe', ['2', '180'], ['78'], 'overflow'),
            Expect.Simple('subtraction8signedsafe', ['31', '2'], ['29']),
            Expect.Simple('subtraction8signedsafe', ['20', '180'], ['96'], 'overflow'),
            Expect.Simple('subtraction8signedunsafe', ['32', '20'], ['12']),
            Expect.Simple('subtraction8signedunsafe', ['20', '180'], ['96'], 'overflow'),
            Expect.Simple('subtraction200safe', ['60', '8'], ['52']),
            Expect.Simple(
              'subtraction200safe',
              ['800000000000000000000000000000000000', '900000000000000000000000000000000000'],
              null,
              'overflow',
            ),
            Expect.Simple('subtraction200unsafe', ['64', '8'], ['56']),
            Expect.Simple(
              'subtraction200unsafe',
              ['800000000000000000000000000000000000', '900000000000000000000000000000000000'],
              ['1606938044258990275541961992341162602522202993782792835301376'],
              'overflow',
            ),
            Expect.Simple('subtraction256safe', ['20', '4', '5', '2'], ['15', '2']),
            Expect.Simple('subtraction256safe', ['20', '1', '5', '2'], null, 'overflow'),
            Expect.Simple('subtraction256unsafe', ['20', '4', '5', '2'], ['15', '2']),
            Expect.Simple(
              'subtraction256unsafe',
              ['20', '4', '50', '2'],
              ['340282366920938463463374607431768211426', '1'],
              'overflow',
            ),
            Expect.Simple('subtraction256signedsafe', ['20', '4', '5', '2'], ['15', '2']),
            Expect.Simple(
              'subtraction256signedsafe',
              ['0', '0', '1', '0'],
              [
                '340282366920938463463374607431768211455',
                '340282366920938463463374607431768211455',
              ],
            ),
            Expect.Simple(
              'subtraction256signedsafe',
              ['20', '1', '5', '2'],
              ['15', '340282366920938463463374607431768211455'],
              'overflow',
            ),
            Expect.Simple('subtraction256signedunsafe', ['20', '4', '5', '2'], ['15', '2']),
            Expect.Simple(
              'subtraction256signedunsafe',
              ['20', '4', '50', '2'],
              ['340282366920938463463374607431768211426', '1'],
              'overflow',
            ),
          ]),
          File.Simple('xor', [
            Expect.Simple('xor8safe', ['10', '24'], ['18']),
            Expect.Simple('xor8signedsafe', ['10', '24'], ['18']),
            Expect.Simple('xor8unsafe', ['10', '24'], ['18']),
            Expect.Simple('xor8signedunsafe', ['10', '24'], ['18']),
            Expect.Simple('xor256safe', ['10', '7', '24', '19'], ['18', '20']),
            Expect.Simple('xor256signedsafe', ['10', '7', '24', '19'], ['18', '20']),
            Expect.Simple('xor256unsafe', ['10', '7', '24', '19'], ['18', '20']),
            Expect.Simple('xor256signedunsafe', ['10', '7', '24', '19'], ['18', '20']),
          ]),
        ]),
        new Dir('memory', [
          File.Simple('dynamicArrays', [
            Expect.Simple('uint8writes', [], ['45']),
            Expect.Simple('uint256writes', [], ['45', '0']),
          ]),
        ]),
        new Dir('storage', [
          File.Simple('scalars', [
            Expect.Simple('getValues', [], ['2', '4']),
            Expect.Simple('readValues', [], ['2', '4']),
            new Expect('setOnce', [
              ['setValues', ['5', '8'], [], '0'],
              ['getValues', [], ['5', '8'], '0'],
            ]),
            new Expect('setRepeated', [
              ['setValues', ['1', '1'], [], '0'],
              ['setValues', ['11', '32'], [], '0'],
              ['getValues', [], ['11', '32'], '0'],
            ]),
          ]),
        ]),
        new Dir('mangled_identifiers', [
          File.Simple('free_function', [
            Expect.Simple('f', [], ['20']),
            Expect.Simple('s', [], ['10']),
          ]),
        ]),
        new Dir('error_handling', [
          File.Simple('revert', [
            new Expect('conditionalRevert', [['couldFail', ['2'], ['4', '0'], '0']]),
            new Expect('conditionalRevert should fail', [
              ['couldFail', ['1'], null, '0', 'I am failing'],
            ]),
            new Expect('revertBothBranches', [
              ['definitelyFailsWithMsg', [], null, '0', 'I am failing'],
            ]),
            new Expect('revertBothBranches fails with no message', [
              // fails without a message
              ['definitelyFailsNoMsg', [], null, '0'],
            ]),
          ]),
          File.Simple('assert', [
            new Expect('assert should pass', [['willPass', [], [], '0']]),
            new Expect('assert should fail', [['shouldFail', ['1'], null, '0']]),
          ]),
          File.Simple('require', [
            new Expect('require should pass', [['willPass', [], [], '0']]),
            new Expect('require should fail', [['shouldFail', [], null, '0', 'why is x not 2???']]),
          ]),
        ]),
        new Dir('delete', [
          // ---- "address" functionCall to cairo not implemented yet ----
          // File.Simple('address', [
          //   Expect.Simple('f', [], ['23', '0']),
          // ]),
          // ---- ArrayType not implemented yet (fails on StorageAllocator) ----
          // File.Simple('array_static', [
          //   new Expect('delete', [
          //     ['get', ['2', '0'], ['3', '0'], '0'],
          //     ['clearAt', ['2', '0'], [], '0'],
          //     ['get', ['2', '0'], ['0', '0'], '0'],
          //     ['get', ['0', '0'], ['1', '0'], '0'],
          //     ['clear', [], [], '0'],
          //     ['getLength', [], ['4', '0'], '0'],
          //     ['get', ['0', '0'], ['0', '0'], '0'],
          //   ]),
          // ]),

          // ---- ArrayType not implemented yet (fails on StorageAllocator) ----
          // File.Simple('array_dynamic', [
          //   new Expect('delete', [
          //     ['initialize', [], [], '0'],
          //     ['clearAt', ['2', '0'], [], '0'],
          //     ['get', ['2', '0'], ['0', '0'], '0'],
          //     ['get', ['0', '0'], ['8', '0'], '0'],
          //     ['clear', [], [], '0'],
          //     ['getLength', [], ['0', '0'], '0'],
          //   ]),
          // ]),

          // ---- BoolType not implemented yet (fails on StorageAllocator) ----
          // File.Simple('boolean', [
          //   Expect.Simple('boolean', [], ['0']),
          // ]),

          // ---- UserDefinedType not implemented yet (fails on StorageAllocator) ----
          // File.Simple('enum', [
          //   new Expect('delete', [
          //     ['set', ['3'], [], '0'],
          //     ['reset', [], [], '0'],
          //     ['get', [], ['0'], '0'],
          //   ]),
          // ]),

          File.Simple('int', [
            new Expect('delete', [
              ['totalSupply', [], ['100000000000000', '0'], '0'],
              ['reset', [], [], '0'],
              ['totalSupply', [], ['0', '0'], '0'],
              ['addValue', ['25', '0'], ['25', '0'], '0'],
            ]),
          ]),

          // ---- UserDefinedType not implemented yet (fails on StorageAllocator) ----
          // File.Simple('struct', [
          //   new Expect('delete', [
          //     ['getRadious', [], ['5', '0'], '0'],
          //     ['reset', [], [], '0'],
          //     ['getRadious', [], ['0', '0'], '0'],
          //     ['getPoint', [], ['0', '0', '0', '0'], '0'],
          //   ]),
          // ]),
        ]),
      ]),
    ]),
  ]),
);